import { Navigate, Outlet } from "react-router-dom";
import store from "../redux/store";

const ProtectedRoutes = () => {
  const loginReducer = store.getState().loginReducer;
  return loginReducer.isLogin ? <Outlet />: <Navigate to="/login" /> ;
};

export default ProtectedRoutes;