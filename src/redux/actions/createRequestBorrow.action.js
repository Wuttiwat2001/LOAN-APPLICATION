import {
  REQUEST_FETCHING,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
} from "../../constants/actionType";
import { server, SUCCESS } from "../../constants/api";

import api from "../../services/api";
import { message } from "antd";

export const setRequestFetchingToState = () => ({
  type: REQUEST_FETCHING,
});

export const setRequestSuccessToState = () => ({
  type: REQUEST_SUCCESS,
});

export const setRequestFailedToState = (payload) => ({
  type: REQUEST_FAILED,
  payload
});

export const createRequestBorrow = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRequestFetchingToState());

      const response = await api.post(`${server.REQUEST_URL}/requestBorrow`, {
        ...payload,
      });

      if (response.data.message === SUCCESS) {
        dispatch(setRequestSuccessToState());
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
