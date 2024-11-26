import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Alert,
  Typography,
  Card,
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import * as loginAction from "../../redux/actions/login.action";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";

const LoginPage = () => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(loginAction.login(values, navigate));
  };

  return (
    <Card className="cardStyle" style={{ width: 820 }}>
      <Row>
        <Col
          style={{
            backgroundColor: "#1677ff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px 0 0 8px",
          }}
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography.Title
            level={3}
            style={{  marginBottom: "0px",  color: "#fff" }}
          >
            ยืมมั้ย
          </Typography.Title>
          <Typography.Title   style={{  marginBottom: "24px",  color: "#fff" }} level={5}>ยินดีตอนรับสู่ยืมมั้ย</Typography.Title>
        </Col>

        
        <Col
          style={{ padding: "24px" }}
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography.Title
            level={3}
            style={{ textAlign: "center", marginBottom: 24 }}
          >
            เข้าสู่ระบบ
          </Typography.Title>
          <Form
            name="login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุรหัสผู้ใช้งาน!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="รหัสผู้ใช้งาน" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุรหัสผ่าน",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="รหัสผ่าน"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox disabled={loginReducer.isFetching}>
                    จดจำการเข้าสู่ระบบ
                  </Checkbox>
                </Form.Item>
                <a href="" disabled={loginReducer.isFetching}>
                  ลืมรหัสผ่าน
                </a>
              </Flex>
            </Form.Item>

            {loginReducer.isFailed && (
              <>
                <Alert
                  style={{ marginBottom: "12px" }}
                  message={loginReducer.errorMessage}
                  type="error"
                  showIcon
                  closable
                />
              </>
            )}

            <Form.Item>
              <Button
                block
                loading={loginReducer.isFetching}
                disabled={loginReducer.isFetching}
                type="primary"
                htmlType="submit"
              >
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
            <Flex justify="center" align="center">
              เพิ่งเคยเข้ามาในใช้ ยืมมั้ย ใช่หรือไม่&nbsp;
              <a
                onClick={() => navigate("/register")}
                disabled={loginReducer.isFetching}
              >
                สมัครใหม่?
              </a>
            </Flex>
            <br />
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default LoginPage;
