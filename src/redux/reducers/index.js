import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./login.reducer";
import registerReducer from "./register.reducer";
import transactionReducer from "./transaction.reducer";
import userReducer from "./user.reducer";
import createRequestBorrowReducer from "./createRequestBorrow.reducer";
import requestSenderReducer from "./requestSender.reducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  transactionReducer,
  userReducer,
  createRequestBorrowReducer,
  requestSenderReducer
});

export default rootReducer;
