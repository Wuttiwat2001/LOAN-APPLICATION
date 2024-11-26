import {
  REQUEST_EDIT_FETCHING,
  REQUEST_EDIT_SUCCESS,
  REQUEST_EDIT_FAILED,
} from "../../constants/actionType";

const initialState = {
  user: null,
  isFetching: false,
  isFailed: false,
  errorMessage: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_EDIT_FETCHING:
      return {
        ...state,
        user: null,
        isFetching: true,
        isError: false,
        errorMessage: "",
      };
    case REQUEST_EDIT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        errorMessage: "",
      };
    case REQUEST_EDIT_FAILED:
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
