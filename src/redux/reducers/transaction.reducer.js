import {
  TRANSACTION_FETCHING,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILED,
  TRANSACTION_CLEAR,
} from "./../../constants/actionType";

const initialState = {
  transactions: [],
  page: 1,
  pageSize: 10,
  totalTransactions: 0,
  isFetching: false,
  isFailed: false,
  errorMessage: "",
  incomeTransactions:{
    amount:0,
    count:0
  },
  expenseTransactions:{
    amount:0,
    count:0
  },
  typeCount: [
    { status: "ยืมเงิน", countType: 0 },
    { status: "ได้รับเงินคืน", countType: 0 },
    { status: "ให้ยืมเงิน", countType: 0 },
    { status: "คืนเงิน", countType: 0 },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRANSACTION_FETCHING:
      return {
        ...state,
        transactions: [],
        page: 1,
        pageSize: 10,
        totalTransactions: 0,
        isFetching: true,
        isFailed: false,
        errorMessage: "",
        incomeTransactions:{
          amount:0,
          count:0
        },
        expenseTransactions:{
          amount:0,
          count:0
        },
        typeCount: [
          { status: "ยืมเงิน", countType: 0 },
          { status: "ได้รับเงินคืน", countType: 0 },
          { status: "ให้ยืมเงิน", countType: 0 },
          { status: "คืนเงิน", countType: 0 },
          { status: "ได้รับเงินคืน", countType: 0 },
        ],
      };
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: payload.transactions,
        page: payload.page,
        pageSize: payload.pageSize,
        totalTransactions: payload.totalTransactions,
        incomeTransactions: payload.incomeTransactions,
        expenseTransactions:payload.expenseTransactions,
        isFetching: false,
        isFailed: false,
        errorMessage: "",
        typeCount: payload.typeCount,
      };

    case TRANSACTION_FAILED:
      return {
        ...state,
        transactions: [],
        page: 1,
        pageSize: 10,
        totalTransactions: 0,
        isFetching: false,
        isFailed: true,
        errorMessage: payload,
        incomeTransactions:{
          amount:0,
          count:0
        },
        expenseTransactions:{
          amount:0,
          count:0
        },
        typeCount: [
          { status: "ยืมเงิน", countType: 0 },
          { status: "ได้รับเงินคืน", countType: 0 },
          { status: "ให้ยืมเงิน", countType: 0 },
          { status: "คืนเงิน", countType: 0 },
        ],
      };
    case TRANSACTION_CLEAR:
      return {
        ...state,
        transactions: [],
        page: 1,
        pageSize: 10,
        totalTransactions: 0,
        isFetching: false,
        isFailed: false,
        errorMessage: "",
        incomeTransactions:{
          amount:0,
          count:0
        },
        expenseTransactions:{
          amount:0,
          count:0
        },
        typeCount: [
          { status: "ยืมเงิน", countType: 0 },
          { status: "ให้ยืมเงิน", countType: 0 },
          { status: "คืนเงิน", countType: 0 },
          { status: "ได้รับเงินคืน", countType: 0 },
        ],
      };

    default:
      return state;
  }
};
