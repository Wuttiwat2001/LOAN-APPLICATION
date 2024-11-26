import {
  REQUEST_EDIT_FETCHING,
  REQUEST_EDIT_SUCCESS,
  REQUEST_EDIT_FAILED,
} from "./../../constants/actionType";
import { server, SUCCESS } from "./../../constants/api";
import { message } from "antd";
import api from "../../services/api";

export const setRegisterFetchingToState = () => ({
  type: REQUEST_EDIT_FETCHING,
});

export const setRegisterSuccessToState = (payload) => ({
  type: REQUEST_EDIT_SUCCESS,
  payload,
});

export const setRegisterFailedToState = (payload) => ({
  type: REQUEST_EDIT_FAILED,
  payload,
});

export const requestEdit = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRegisterFetchingToState());

      const response = await api.post(server.REQUEST_URL, {
        ...payload,
      });
      if ((response.data.message = SUCCESS)) {
        dispatch(setRegisterSuccessToState(payload));
        message.success("ลงทะเบียนสำเร็จ");
      }
    } catch (error) {
      dispatch(setRegisterFailedToState(`${error.error}`));
      message.error(
        error.error
          ? `${error.error}`
          : "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"
      );
    }
  };
};
