import {
  REQUEST_FETCHING,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
} from "../../constants/actionType";
import { server, SUCCESS } from "../../constants/api";

import api from "../../services/api";

export const setRequestFetchingToState = () => ({
  type: REQUEST_FETCHING,
});

export const setRequestSuccessToState = () => ({
  type: REQUEST_SUCCESS,
});

export const setRequestFailedToState = () => ({
  type: REQUEST_FAILED,
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
      } else {
        dispatch(setRequestFailedToState());
      }
    } catch (error) {
      dispatch(setRequestFailedToState());
    }
  };
};
