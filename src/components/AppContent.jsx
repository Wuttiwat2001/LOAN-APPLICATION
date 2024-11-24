import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

const AppContent = () => {
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      <Routes>
        <Route path="/" element={<div>hello</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/about" element={<div>hello about us</div>} />
      </Routes>
    </Content>
  );
};

export default AppContent;
