import { Navigate, Outlet,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
  const isLogin = useSelector((state) => state.loginReducer.isLogin);  
  return isLogin ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;