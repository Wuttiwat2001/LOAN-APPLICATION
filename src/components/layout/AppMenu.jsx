import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  FileAddOutlined,
  MailOutlined,
  UserSwitchOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const { Sider } = Layout;

const AppMenu = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      
      

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        style={{
          marginBottom: "0px",
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
            key: "/repay",
            icon: <UserSwitchOutlined />,
            label: "คืนเงิน",
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
