import {
  Dropdown,
  Layout,
  Button,
  Typography,
  Avatar,
  Row,
  Col,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  WalletOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as loginAction from "../../redux/actions/login.action";
import PropTypes from 'prop-types';


const { Header } = Layout;
const { Title } = Typography;

const AppHeader = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginReducer.user);

  const onClick = ({ key }) => {
    if(key == 1){
      dispatch(loginAction.logout(navigate));
    }
  };
  const items = [
    {
      key: '1',
      label: 'ออกจากระบบ',
      icon: <LogoutOutlined />,
    },
  ];

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

          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <Avatar
              onClick={(e) => e.preventDefault()}
              style={{
                cursor: "pointer",
                marginRight: "16px",
                backgroundColor: "#1677ff",
                verticalAlign: "middle",
              }}
              size="large"
            >
              {user?.username.charAt(0)}
            </Avatar>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};
AppHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

export default AppHeader;
