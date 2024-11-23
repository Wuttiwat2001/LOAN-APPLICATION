import React from "react";
import { Layout,Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header } = Layout;

const AppHeader = ({ collapsed, setCollapsed }) => {
  
  return (
    <Header
    style={{
      padding: 0,
      background: "#fff",
    }}
  >
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: "16px",
        width: 64,
        height: 64,
      }}
    />
  </Header>
  );
};

export default AppHeader;

