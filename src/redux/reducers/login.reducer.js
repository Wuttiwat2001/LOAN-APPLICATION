import {
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "../../constants/actionType";

const initialState = {
  user: null,
  isFetching: false,
  isFailed: false,
  isLogin: false,
  errorMessage: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_FETCHING:
      return {
        ...state,
        user: null,
        isFetching: true,
        isFailed: false,
        isLogin: false,
        errorMessage: "",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isFetching: false,
        isFailed: false,
        isLogin: true,
        errorMessage: "",
      };
    case LOGIN_FAILED:
      return {
        ...state,
        user: null,
        isFetching: false,
        isFailed: true,
        isLogin: false,
        errorMessage: payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isFetching: false,
        isFailed: false,
        isLogin: false,
        errorMessage: "",
      };
    default:
      return state;
  }
};
