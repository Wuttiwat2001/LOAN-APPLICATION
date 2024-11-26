import {
  REPAY_FETCHING,
  REPAY_SUCCESS,
  REPAY_FAILED,
} from "../../constants/actionType";

const initialState = {
  isFetching: false,
  isFailed: false,
  errorMessage: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REPAY_FETCHING:
      return {
        ...state,
        isFetching: true,
        isFailed: false,
        errorMessage: "",
      };
    case REPAY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFailed: false,
        errorMessage: "",
      };
    case REPAY_FAILED:
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
