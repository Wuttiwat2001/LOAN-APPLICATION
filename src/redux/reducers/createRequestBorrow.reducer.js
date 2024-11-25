import {
  REQUEST_FETCHING,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
} from "../../constants/actionType";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isFailed: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case REQUEST_FETCHING:
      return { ...state, isFetching: true, isSuccess: false, isError: false };
    case REQUEST_SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, isError: false };
    case REQUEST_FAILED:
      return { ...state, isFetching: false, isSuccess: false, isError: true };
    default:
      return state;
  }
};
