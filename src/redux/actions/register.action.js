import {
  REGISTER_FAILED,
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
} from "./../../constants/actionType";
import { server, SUCCESS } from "./../../constants/api";
import { message } from "antd";

import api from "../../services/api";

export const setRegisterFetchingToState = () => ({
  type: REGISTER_FETCHING,
});

export const setRegisterSuccessToState = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const setRegisterFailedToState = (payload) => ({
  type: REGISTER_FAILED,
  payload,
});

export const register = (payload, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(setRegisterFetchingToState());

      const response = await api.post(server.REGISTER_URL, {
        ...payload,
      });
      if ((response.data.message === SUCCESS)) {
        dispatch(setRegisterSuccessToState(response.data.user));
        navigate("/login");
        message.success("ลงทะเบียนสำเร็จ");
      } 
    } catch (error) {
      dispatch(setRegisterFailedToState(error.error));
      message.error(error.error ? `${error.error}` : "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง");
    }
  };
};
