import {
  USER_FETCHING,
  USER_SUCCESS,
  USER_FAILED,
  USER_CLEAR,
  USER_BALANCE_FETCHING,
  USER_BALANCE_SUCCESS,
  USER_BALANCE_FAILED,
} from "../../constants/actionType";

import { server, SUCCESS } from "../../constants/api";
import api from "../../services/api";
import store from "../store";

// User

export const setUserFetchingToState = () => ({
  type: USER_FETCHING,
});

export const setUserSuccessToState = (payload) => ({
  type: USER_SUCCESS,
  payload,
});

export const setUserFailedToState = () => ({ type: USER_FAILED });

export const setUserClearToState = () => ({ type: USER_CLEAR });

// User Balance

export const setUserBalanceFetchingToState = () => ({
  type: USER_BALANCE_FETCHING,
});

export const setUserBalanceSuccessToState = (payload) => ({
  type: USER_BALANCE_SUCCESS,
  payload,
});

export const setUserBalanceFailedToState = (payload) => (
  { type: USER_BALANCE_FAILED }, payload
);

export const loadUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(setUserFetchingToState());
      const response = await api.get(server.USER_URL);
      if (response.data.message === SUCCESS) {
        dispatch(setUserSuccessToState(response.data.users));
      } else {
        dispatch(setUserFailedToState());
      }
    } catch (error) {
      dispatch(setUserFailedToState());
    }
  };
};

export const loadUserBalance = () => async (dispatch) => {
  try {
    dispatch(setUserBalanceFetchingToState());
    const loginReducer = store.getState().loginReducer;
    if (loginReducer.isLogin) {
      const userId = loginReducer.user.id;
      const response = await api.get(`${server.USER_URL}/balance/${userId}`);
      if (response.data.message === SUCCESS) {
        dispatch(setUserBalanceSuccessToState(response.data.user));
      } else {
        dispatch(
          setUserBalanceFailedToState(
            "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"
          )
        );
        message.error("เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง");
      }
    } else {
      dispatch(setUserBalanceFailedToState("ไม่พบข้อมูลผู้ใช้หรือโทเค็น"));
      message.error("ไม่พบข้อมูลผู้ใช้หรือโทเค็น");
    }
  } catch (error) {
    dispatch(
      setUserBalanceFailedToState(
        error.error || "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"
      )
    );
    message.error(
      error.error
        ? `${error.error}`
        : "เซิร์ฟเวอร์เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งภายหลัง"
    );
  }
};
