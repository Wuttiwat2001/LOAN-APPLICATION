import {
  REGISTER_FAILED,
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
} from "./../../constants/actionType";
import { server, SUCCESS } from "./../../constants/api";

import api from "../../services/api";

export const setRegisterFetchingToState = () => ({
  type: REGISTER_FETCHING,
});

export const setRegisterSuccessToState = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const setRegisterFailedToState = () => ({ type: REGISTER_FAILED });

export const register = (payload, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(setRegisterFetchingToState());

      const response = await api.post(server.REGISTER_URL, {
        ...payload,
      });
      if ((response.data.message = SUCCESS)) {
        dispatch(setRegisterSuccessToState(response.data.user));
        navigate("/login");
      } else {
        dispatch(setRegisterFailedToState());
      }
    } catch (error) {
      dispatch(setRegisterFailedToState());
    }
  };
};
