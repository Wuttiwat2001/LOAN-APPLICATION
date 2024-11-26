import {
  REQUEST_SENDER_FETCHING,
  REQUEST_SENDER_SUCCESS,
  REQUEST_SENDER_FAILED,
  REQUEST_SENDER_CLEAR,
} from "../../constants/actionType";
import { server, SUCCESS } from "../../constants/api";
import store from "../store";
import api from "../../services/api";
import { message } from "antd";

export const setRequestFetchingToState = () => ({
  type: REQUEST_SENDER_FETCHING,
});

export const setRequestSuccessToState = (payload) => ({
  type: REQUEST_SENDER_SUCCESS,
  payload,
});

export const setRequestFailedToState = (payload) => ({
  type: REQUEST_SENDER_FAILED,
  payload
});

export const setRequestClearToState = () => ({
  type: REQUEST_SENDER_CLEAR,
});

export const loadRequestSenders = (page,pageSize,search,searchDate) => {
  return async (dispatch) => {
    try {
      dispatch(setRequestFetchingToState());
      const loginReducer = store.getState().loginReducer;
      if (loginReducer.isLogin) {
        const userId = loginReducer.user.id;
        const response = await api.post(
          `${server.REQUEST_URL}/requestSender?page=${page}&pageSize${pageSize}`,{
            userId: userId,
            search: search,
            searchDate: searchDate
          }
        );

        if ((response.data.message = SUCCESS)) {
          dispatch(setRequestSuccessToState(response.data));
        } else {
          dispatch(setRequestFailedToState());
        }
      } else {
        dispatch(setRequestFailedToState());
      }
    } catch (error) {
      dispatch(setRequestFailedToState(error));
      message.error(
        error.error
          ? `${error.error}`
          : "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"
      );
    }
  };
};
