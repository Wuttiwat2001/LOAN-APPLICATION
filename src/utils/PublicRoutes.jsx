import { Navigate, Outlet } from "react-router-dom";
import store from "../redux/store";

const PublicRoutes = () => {
  const loginReducer = store.getState().loginReducer;
  return loginReducer.isLogin ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;