import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const AppMenu = ({ collapsed }) => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      navigate("/");
    } else if (e.key === "2") {
      navigate("/about");
    } else if (e.key === "3") {
      navigate("/transaction");
    }
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={handleMenuClick}
        style={{
          height: '100%',
        }}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "Home",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "About",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "Upload",
          },
        ]}
      />
    </Sider>
  );
};

export default AppMenu;