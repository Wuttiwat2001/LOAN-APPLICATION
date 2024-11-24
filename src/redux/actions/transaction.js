import {
  TRANSACTION_FETCHING,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILED,
  TRANSACTION_CLEAR,
} from "./../../constants/actionType";

import { server, SUCCESS } from "./../../constants/api";
import store from "./../store";
import api from "../../services/api";

export const setTransactionFetchingToState = () => ({
  type: TRANSACTION_FETCHING,
});

export const setTransactionSuccessToState = (payload) => ({
  type: TRANSACTION_SUCCESS,
  payload,
});

export const setTransactionFailedToState = () => ({ type: TRANSACTION_FAILED });

export const setTransactionClearToState = () => ({ type: TRANSACTION_CLEAR });

export const loadTransaction = () => {
  return async (dispatch) => {
    try {
      dispatch(setTransactionFetchingToState());
      const loginReducer = store.getState().loginReducer;
      if (loginReducer.isLogin) {
        const userId = loginReducer.user.id;
        const response = await api.get(`${server.TRANSACTION_URL}/${userId}`);
        if ((response.data.message = SUCCESS)) {
          dispatch(setTransactionSuccessToState(response.data.transactions));
        } else {
          dispatch(setTransactionFailedToState());
        }
      } else {
        dispatch(setTransactionFailedToState());
      }
    } catch (error) {
      dispatch(setTransactionFailedToState());
    }
  };
};
