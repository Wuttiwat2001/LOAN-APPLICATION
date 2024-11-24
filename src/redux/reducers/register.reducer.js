import {
  REGISTER_FAILED,
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
} from "../../constants/actionType";

const initialState = {
  user: null,
  isFetching: false,
  isFailed: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_FETCHING:
      return { ...state, user: null, isFetching: true, isError: false };
    case REGISTER_SUCCESS:
      return { ...state, user: payload, isFetching: false, isError: false };
    case REGISTER_FAILED:
      return { ...state, user: null, isFetching: false, isError: true };
    default:
      return state;
  }
};
