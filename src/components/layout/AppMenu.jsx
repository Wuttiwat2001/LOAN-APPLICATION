import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  FileAddOutlined,
  MailOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

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
            icon: <HomeOutlined />,
            label: "หน้าหลัก",
          },
          {
            key: "/request-sender",
            icon: <FileAddOutlined />,
            label: "ขอยืมเงิน",
          },
          {
            key: "/request-receiver",
            icon: <MailOutlined />,
            label: "รายการคำร้อง",
          },
          {
            key: "/transaction",
            icon: <HistoryOutlined />,
            label: "ธุรกรรมของฉัน",
          },
        ]}
      />
    </Sider>
  );
};
AppMenu.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

export default AppMenu;
