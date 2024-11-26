import {
  REQUEST_RECEIVER_FETCHING,
  REQUEST_RECEIVER_SUCCESS,
  REQUEST_RECEIVER_FAILED,
  REQUEST_RECEIVER_CLEAR,
} from "../../constants/actionType";
import { server, SUCCESS } from "../../constants/api";
import store from "../store";
import api from "../../services/api";
import { message } from "antd";

export const setRequestFetchingToState = () => ({
  type: REQUEST_RECEIVER_FETCHING,
});

export const setRequestSuccessToState = (payload) => ({
  type: REQUEST_RECEIVER_SUCCESS,
  payload,
});

export const setRequestFailedToState = (payload) => ({
  type: REQUEST_RECEIVER_FAILED,
  payload,
});

export const setRequestClearToState = () => ({
  type: REQUEST_RECEIVER_CLEAR,
});

export const loadRequestReceivers = (page, pageSize, search, searchDate) => {
  return async (dispatch) => {
    try {
      dispatch(setRequestFetchingToState());
      const loginReducer = store.getState().loginReducer;
      if (loginReducer.isLogin) {
        const userId = loginReducer.user.id;
        const response = await api.post(
          `${server.REQUEST_URL}/requestReceiver?page=${page}&pageSize${pageSize}`,
          {
            userId: userId,
            search: search,
            searchDate: searchDate,
          }
        );

        if (response.data.message === SUCCESS) {
          dispatch(setRequestSuccessToState(response.data));
        } else {
          dispatch(setRequestFailedToState("เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"));
          message.error("เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง");
        }
      } else {
        dispatch(setRequestFailedToState("ไม่พบข้อมูลผู้ใช้หรือโทเค็น"));
        message.error("ไม่พบข้อมูลผู้ใช้หรือโทเค็น");
      }
    } catch (error) {
      dispatch(setRequestFailedToState(error.error || "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"));
      message.error(
        error.error
          ? `${error.error}`
          : "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"
      );
    }
  };
};
