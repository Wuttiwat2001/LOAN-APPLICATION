import {
  REQUEST_EDIT_FETCHING,
  REQUEST_EDIT_SUCCESS,
  REQUEST_EDIT_FAILED,
} from "./../../constants/actionType";
import { server, SUCCESS } from "./../../constants/api";
import { message } from "antd";
import api from "../../services/api";

export const setRequestFetchingToState = () => ({
  type: REQUEST_EDIT_FETCHING,
});

export const setRequestSuccessToState = () => ({
  type: REQUEST_EDIT_SUCCESS,
});

export const setRequestFailedToState = (payload) => ({
  type: REQUEST_EDIT_FAILED,
  payload,
});

export const edit = (status, id) => {
  return async (dispatch) => {
    try {
      dispatch(setRequestFetchingToState());

      const response = await api.post(
        `${server.REQUEST_URL}/approveOrRejectRequest/${id}`,
        {
          status: status,
        }
      );
      if ((response.data.message = SUCCESS)) {
        dispatch(setRequestSuccessToState());
        message.success(`${status}คำร้องสำเร็จ`);
      }
    } catch (error) {
      dispatch(setRequestFailedToState(error.error));
      message.error(
        error.error
          ? `${error.error}`
          : "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"
      );
    }
  };
};
