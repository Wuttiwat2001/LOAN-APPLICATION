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
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isFetching: false,
        isFailed: false,
        isLogin: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        user: null,
        isFetching: false,
        isFailed: true,
        isLogin: false,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
