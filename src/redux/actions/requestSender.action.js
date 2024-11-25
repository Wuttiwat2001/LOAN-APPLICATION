import {
  REQUEST_SENDER_FETCHING,
  REQUEST_SENDER_SUCCESS,
  REQUEST_SENDER_FAILED,
  REQUEST_SENDER_CLEAR,
} from "../../constants/actionType";
import { server, SUCCESS } from "../../constants/api";
import store from "../store";
import api from "../../services/api";

export const setRequestFetchingToState = () => ({
  type: REQUEST_SENDER_FETCHING,
});

export const setRequestSuccessToState = (payload) => ({
  type: REQUEST_SENDER_SUCCESS,
  payload,
});

export const setRequestFailedToState = () => ({
  type: REQUEST_SENDER_FAILED,
});

export const setRequestClearToState = () => ({
  type: REQUEST_SENDER_CLEAR,
});

export const loadRequestSenders = (page,pageSize) => {
  return async (dispatch) => {
    try {
      dispatch(setRequestFetchingToState());
      const loginReducer = store.getState().loginReducer;
      if (loginReducer.isLogin) {
        const userId = loginReducer.user.id;

        const response = await api.get(
          `${server.REQUEST_URL}/requestSender/${userId}?page=${page}&pageSize=${pageSize}`
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
      dispatch(setRequestFailedToState());
    }
  };
};
