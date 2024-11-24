import {
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./../../constants/actionType";

import { server } from "./../../constants/api";

import api from "../../services/api";

export const setLoginFetchingToState = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginSuccessToState = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setLoginFailedToState = () => ({
  type: LOGIN_FAILED,
});

export const setLogoutToState = () => ({
  type: LOGOUT,
});

export const login = (payload, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(setLoginFetchingToState());

      const response = await api.post(server.LOGIN_URL, {
        payload,
      });
      if (response.data.message === SUCCESS) {
        localStorage.setItem(ACCESS_TOKEN, response.data.token);
        localStorage.setItem(USER, JSON.stringify(response.data.user));
        dispatch(setLoginSuccessToState(response.data.user));
        navigate("/transaction");
      } else {
        dispatch(setLoginFailedToState());
      }
    } catch (error) {
      dispatch(setLoginFailedToState());
    }
  };
};
