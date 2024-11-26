import {
  USER_FETCHING,
  USER_SUCCESS,
  USER_FAILED,
  USER_CLEAR,
  USER_BALANCE_FETCHING,
  USER_BALANCE_SUCCESS,
  USER_BALANCE_FAILED,
} from "./../../constants/actionType";

const initialState = {
  users: [],
  isFetching: false,
  isFailed: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_FETCHING:
      return { ...state, users: [], isFetching: true, isFailed: false };
    case USER_SUCCESS:
      return {
        ...state,
        users: payload,
        isFetching: false,
        isFailed: false,
      };

    case USER_FAILED:
      return { ...state, users: [], isFetching: false, isFailed: true };
    case USER_CLEAR:
      return { ...state, users: [], isFetching: false, isFailed: false };
    case USER_BALANCE_FETCHING:
      return { ...state, balance: 0 };
    case USER_BALANCE_SUCCESS:
      return { ...state, balance: payload.balance };
    case USER_BALANCE_FAILED:
      return { ...state, balance: 0, isFailed: true };

    default:
      return state;
  }
};
