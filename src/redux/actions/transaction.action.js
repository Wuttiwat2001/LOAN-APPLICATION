import {
  TRANSACTION_FETCHING,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILED,
  TRANSACTION_CLEAR,
} from "../../constants/actionType";

import { server, SUCCESS } from "../../constants/api";
import store from "../store";
import api from "../../services/api";
import { message } from "antd";

export const setTransactionFetchingToState = () => ({
  type: TRANSACTION_FETCHING,
});

export const setTransactionSuccessToState = (payload) => ({
  type: TRANSACTION_SUCCESS,
  payload,
});

export const setTransactionFailedToState = (payload) => ({
  type: TRANSACTION_FAILED,
  payload,
});

export const setTransactionClearToState = () => ({ type: TRANSACTION_CLEAR });

export const loadTransactions = (page,pageSize,search,searchDate) => {
  return async (dispatch) => {
    try {
      dispatch(setTransactionFetchingToState());
      const loginReducer = store.getState().loginReducer;
      if (loginReducer.isLogin) {
        const userId = loginReducer.user.id;
        const response = await api.post(`${server.TRANSACTION_URL}?page=${page}&pageSize${pageSize}`,{
          userId: userId,
          search: search,
          searchDate: searchDate,
        });
        if ((response.data.message === SUCCESS)) {
          dispatch(setTransactionSuccessToState(response.data));
        } else {
          dispatch(setTransactionFailedToState("เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"));
          message.error("เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง");
        }
      } else {
        dispatch(setTransactionFailedToState("ไม่พบข้อมูลผู้ใช้หรือโทเค็น"));
        message.error("ไม่พบข้อมูลผู้ใช้หรือโทเค็น");
      }
    } catch (error) {
      dispatch(setTransactionFailedToState(error));
      message.error(
        error.error
          ? `${error.error}`
          : "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"
      );
    }
  };
};
