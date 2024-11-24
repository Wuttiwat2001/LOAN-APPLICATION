import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./login.reducer";
import registerReducer from "./register.reducer";
import transactionReducer from "./transaction.reducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  transactionReducer
});

export default rootReducer;
