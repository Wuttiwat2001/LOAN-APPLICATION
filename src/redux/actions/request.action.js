import {
  REQUEST_FETCHING,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
  REQUEST_CLEAR,
} from "./../../constants/actionType";
import { server, SUCCESS } from "./../../constants/api";

import api from "../../services/api";

export const setRequestFetchingToState = () => ({
  type: REQUEST_FETCHING,
});

export const setRequestSuccessToState = (payload) => ({
  type: REQUEST_SUCCESS,
  payload,
});

export const setRequestFailedToState = () => ({
  type: REQUEST_FAILED,
});

export const setRequestClearToState = () => ({
  type: REQUEST_CLEAR,
});

export const requestBorrow = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRequestFetchingToState());

      const response = await api.post(`${server.REQUEST_URL}/requestBorrow`, {
        ...payload,
      });

      if (response.data.message === SUCCESS) {
        dispatch(setRequestSuccessToState());
      } else {
        dispatch(setRequestFailedToState());
      }
    } catch (error) {
      dispatch(setRequestFailedToState());
    }
  };
};
