import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const AppMenu = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        style={{
          height: "100%",
        }}
        items={[
          {
            key: "/",
            icon: <UserOutlined />,
            label: "Home",
          },
          {
            key: "/about",
            icon: <VideoCameraOutlined />,
            label: "About",
          },
          {
            key: "/transaction",
            icon: <UploadOutlined />,
            label: "Transaction",
          },
        ]}
      />
    </Sider>
  );
};

export default AppMenu;