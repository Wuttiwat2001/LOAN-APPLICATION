import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const isLogin = useSelector((state) => state.loginReducer.isLogin);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;