import {
  REGISTER_FAILED,
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
} from "../../constants/actionType";

const initialState = {
  user: null,
  isFetching: false,
  isFailed: false,
  errorMessage: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_FETCHING:
      return {
        ...state,
        user: null,
        isFetching: true,
        isError: false,
        errorMessage: "",
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
        isFetching: false,
        isError: false,
        errorMessage: "",
      };
    case REGISTER_FAILED:
      return {
        ...state,
        user: null,
        isFetching: false,
        isError: true,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
