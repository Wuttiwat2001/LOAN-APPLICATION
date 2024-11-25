import {
  USER_FETCHING,
  USER_SUCCESS,
  USER_FAILED,
  USER_CLEAR,
} from "../../constants/actionType";

import { server, SUCCESS } from "../../constants/api";
import store from "../store";
import api from "../../services/api";

export const setUserFetchingToState = () => ({
  type: USER_FETCHING,
});

export const setUserSuccessToState = (payload) => ({
  type: USER_SUCCESS,
  payload,
});

export const setUserFailedToState = () => ({ type: USER_FAILED });

export const setUserClearToState = () => ({ type: USER_CLEAR });

export const loadUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(setUserFetchingToState());
      const response = await api.get(server.USER_URL);
      if ((response.data.message = SUCCESS)) {
        dispatch(setUserSuccessToState(response.data.users));
      } else {
        dispatch(setUserFailedToState());
      }
    } catch (error) {
      dispatch(setUserFailedToState());
    }
  };
};
