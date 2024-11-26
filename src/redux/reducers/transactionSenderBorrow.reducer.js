import {
  TRANSACTION_SEDER_BORROW_FETCHING,
  TRANSACTION_SEDER_BORROW_SUCCESS,
  TRANSACTION_SEDER_BORROW_FAILED,
  TRANSACTION_SEDER_BORROW_CLEAR,
} from "./../../constants/actionType";

const initialState = {
  transactions: [],
  page: 1,
  pageSize: 10,
  totalTransactions: 0,
  isFetching: false,
  isFailed: false,
  errorMessage: "",
  paidTransactions: {},
  outstandingTransactions: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRANSACTION_SEDER_BORROW_FETCHING:
      return {
        ...state,
        transactions: [],
        page: 1,
        pageSize: 10,
        totalTransactions: 0,
        isFetching: true,
        isFailed: false,
        errorMessage: "",
        paidTransactions: {
          count: 0,
          amount: 0,
        },
        outstandingTransactions: {
          count: 0,
          amount: 0,
        },
      };
    case TRANSACTION_SEDER_BORROW_SUCCESS:
      return {
        ...state,
        transactions: payload.transactions,
        page: payload.page,
        pageSize: payload.pageSize,
        totalTransactions: payload.totalTransactions,
        isFetching: false,
        isFailed: false,
        errorMessage: "",
        paidTransactions: payload.paidTransactions,
        outstandingTransactions: payload.outstandingTransactions,
      };

    case TRANSACTION_SEDER_BORROW_FAILED:
      return {
        ...state,
        transactions: [],
        page: 1,
        pageSize: 10,
        totalTransactions: 0,
        isFetching: false,
        isFailed: true,
        errorMessage: payload,
        paidTransactions: {
          count: 0,
          amount: 0,
        },
        outstandingTransactions: {
          count: 0,
          amount: 0,
        },
      };
    case TRANSACTION_SEDER_BORROW_CLEAR:
      return {
        ...state,
        transactions: [],
        page: 1,
        pageSize: 10,
        totalTransactions: 0,
        isFetching: false,
        isFailed: false,
        errorMessage: "",
        paidTransactions: {
          count: 0,
          amount: 0,
        },
        outstandingTransactions: {
          count: 0,
          amount: 0,
        },
      };

    default:
      return state;
  }
};
