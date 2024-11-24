import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./login.reducer";
import registerReducer from "./register.reducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer
});

export default rootReducer;
