import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./login.reducer";
import registerReducer from "./register.reducer";
import transactionReducer from "./transaction.reducer";
import userReducer from "./user.reducer";
import requestReducer from "./request.reducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  transactionReducer,
  userReducer,
  requestReducer
});

export default rootReducer;
