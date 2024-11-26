import {
  REPAY_FETCHING,
  REPAY_SUCCESS,
  REPAY_FAILED,
} from "./../../constants/actionType";
import { server, SUCCESS } from "./../../constants/api";
import { message } from "antd";
import api from "../../services/api";

export const setRepayFetchingToState = () => ({
  type: REPAY_FETCHING,
});

export const setRepaySuccessToState = () => ({
  type: REPAY_SUCCESS,
});

export const setRepayFailedToState = (payload) => ({
  type: REPAY_FAILED,
  payload,
});

export const repay = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setRepayFetchingToState());

      const response = await api.post(`${server.TRANSACTION_URL}/repay`, {
        transactionId: id,
      });
      if (response.data.message === SUCCESS) {
        dispatch(setRepaySuccessToState());
        message.success(`ชำระเงินสำเร็จ`);
      }
    } catch (error) {
      dispatch(setRepayFailedToState(error.error));
      message.error(
        error.error
          ? `${error.error}`
          : "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"
      );
    }
  };
};
