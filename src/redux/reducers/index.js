import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./login.reducer";
import registerReducer from "./register.reducer";
import transactionReducer from "./transaction.reducer";
import transactionSenderBorrowReducer from "./transactionSenderBorrow.reducer";
import userReducer from "./user.reducer";
import createRequestBorrowReducer from "./createRequestBorrow.reducer";
import requestSenderReducer from "./requestSender.reducer";
import requestReceiverReducer from "./requestReceiver.reducer";
import requestEditReducer from "./requestEdit.reducer";


const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  transactionReducer,
  transactionSenderBorrowReducer,
  userReducer,
  createRequestBorrowReducer,
  requestSenderReducer,
  requestReceiverReducer,
  requestEditReducer,
});

export default rootReducer;
