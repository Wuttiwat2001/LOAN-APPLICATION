import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";

const ProtectedRoutes = () => {
  const isLogin = useSelector((state) => state.loginReducer.isLogin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [isLogin]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin />
      </div>
    );
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
