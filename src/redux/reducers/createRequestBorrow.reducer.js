import {
  REQUEST_FETCHING,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
} from "../../constants/actionType";

const initialState = {
  isFetching: false,
  isFailed: false,
  errorMessage: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_FETCHING:
      return { ...state, isFetching: true, isError: false, errorMessage: "" };
    case REQUEST_SUCCESS:
      return { ...state, isFetching: false, isError: false, errorMessage: "" };
    case REQUEST_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
