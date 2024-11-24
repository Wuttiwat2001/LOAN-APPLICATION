import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import PublicRoutes from "../../utils/PublicRoutes";
import ProtectedRoutes from "../../utils/ProtectedRoutes";

const AppContent = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route
          path="/login"
          element={
            <Content
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoginPage />
            </Content>
          }
        />
        <Route
          path="/register"
          element={
            <Content
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RegisterPage />
            </Content>
          }
        />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route
          path="/home"
          element={
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                borderRadius: "8px",
              }}
            >
              <div>hello</div>
            </Content>
          }
        />
        <Route
          path="/about"
          element={
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                borderRadius: "8px",
              }}
            >
              <div>hello about us</div>
            </Content>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppContent;
