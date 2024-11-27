import { Layout, Menu } from "antd";
import {
  FileAddOutlined,
  MailOutlined,
  UserSwitchOutlined,
  HistoryOutlined,
  SwapOutlined
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
            key: "/request-sender",
            icon: <FileAddOutlined />,
            label: "ขอยืมเงิน",
          },
          {
            key: "/transaction-sender-borrow",
            icon: <UserSwitchOutlined />,
            label: "คืนเงิน",
          },
          {
            key: "/transaction-receiver-borrow",
            icon: <SwapOutlined />,
            label: "ให้ยืมเงิน",
          },
          {
            key: "/request-receiver",
            icon: <MailOutlined />,
            label: "คำร้อง",
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
