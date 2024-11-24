import {
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./../../constants/actionType";

import { server, ACCESS_TOKEN, USER, SUCCESS } from "./../../constants/api";

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
        ...payload,
      });

      if (response.data.message === SUCCESS) {
        localStorage.setItem(ACCESS_TOKEN, response.data.token);
        localStorage.setItem(USER, JSON.stringify(response.data.user));
        dispatch(setLoginSuccessToState(response.data.user));
        navigate("/home");
      } else {
        dispatch(setLoginFailedToState());
      }
    } catch (error) {
      dispatch(setLoginFailedToState());
    }
  };
};

export const restoreLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const user = localStorage.getItem(USER);

    if (token && user) {
      dispatch(setLoginSuccessToState(JSON.parse(user)));
    }
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER);
    dispatch(setLogoutToState());
    navigate("/login");
  };
};
