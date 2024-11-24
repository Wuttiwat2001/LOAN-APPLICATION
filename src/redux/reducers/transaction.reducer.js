import {
  TRANSACTION_FETCHING,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILED,
  TRANSACTION_CLEAR,
} from "./../../constants/actionType";

const initialState = {
  transactions: [],
  isFetching: false,
  isFailed: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRANSACTION_FETCHING:
      return { ...state, transactions: [], isFetching: true, isFailed: false };
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: payload,
        isFetching: false,
        isFailed: false,
      };

    case TRANSACTION_FAILED:
      return { ...state, transactions: [], isFetching: false, isFailed: true };
    case TRANSACTION_CLEAR:
      return { ...state, transactions: [], isFetching: false, isFailed: false };

    default:
      return state;
  }
};
