import {
  USER_FETCHING,
  USER_SUCCESS,
  USER_FAILED,
  USER_CLEAR,
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

    default:
      return state;
  }
};
