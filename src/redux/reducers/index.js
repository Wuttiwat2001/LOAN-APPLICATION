import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./login.reducer";

const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;
