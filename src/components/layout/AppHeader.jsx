import React from "react";
import { Layout, Button, Typography, Avatar, Row, Col } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = ({ collapsed, setCollapsed }) => {
  const user = useSelector((state) => state.loginReducer.user);

  return (
    <Header
      style={{
        padding: 0,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Row style={{ width: "100%" }} align="middle">
        <Col>
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
        </Col>
        <Col flex="auto">
          <Title style={{ margin: "0px" }} level={4}>
            ยืมมั้ย !
          </Title>
        </Col>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <WalletOutlined style={{ fontSize: "24px", marginRight: "16px" }} />
          <div style={{ marginRight: "16px" }}>
            <Title style={{ margin: "0px" }} level={5}>
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(user?.balance)}
            </Title>
          </div>
          <Avatar
            style={{
              marginRight: "16px",
              backgroundColor: "#1677ff",
              verticalAlign: "middle",
            }}
            size="large"
          >
            {user?.username.charAt(0)}
          </Avatar>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
