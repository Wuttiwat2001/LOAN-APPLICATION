import {
  Alert,
  Row,
  Col,
  Typography,
  Card,
  Button,
  Form,
  Input,
  Select,
} from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as registerAction from "../../redux/actions/register.action";
import { useSelector, useDispatch } from "react-redux";
import "./Register.css";
const { Option } = Select;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const registerReducer = useSelector((state) => state.registerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        disabled
        style={{
          width: 70,
        }}
      >
        <Option value="66">+66</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values) => {
    const dataToSubmit = {
      ...values,
      prefix: values.prefix,
    };

    dispatch(registerAction.register(dataToSubmit, navigate));
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
            style={{ marginBottom: "0px", color: "#fff" }}
          >
            ยืมมั้ย !
          </Typography.Title>
          <Typography.Title
            style={{ marginBottom: "24px", color: "#fff" }}
            level={5}
          >
            ลงทะเบียนเข้าสู่ระบบยืมมั้ย
          </Typography.Title>
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
            ลงทะเบียนใช้งาน
          </Typography.Title>
          <Form
            initialValues={{
              prefix: "66",
            }}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "กรุณากรอกรหัสผู้ใช้งาน!" },
                { min: 4, message: "รหัสผู้ใช้งานต้องมีอย่างน้อย 4 ตัวอักษร!" },
                { max: 20, message: "รหัสผู้ใช้งานต้องไม่เกิน 20 ตัวอักษร!" },
              ]}
            >
              <Input
                disabled={registerReducer.isFetching}
                prefix={<UserOutlined />}
                placeholder="รหัสผู้ใช้งาน"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกรหัสผ่าน!",
                },
                {
                  min: 8,
                  message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                disabled={registerReducer.isFetching}
                prefix={<LockOutlined />}
                placeholder="รหัสผ่าน"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "กรุณายืนยันรหัสผ่าน!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("รหัสผ่านที่คุณป้อนไม่ตรงกัน!!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                disabled={registerReducer.isFetching}
                prefix={<LockOutlined />}
                placeholder="ยืนยันรหัสผ่าน"
              />
            </Form.Item>

            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "กรุณากรอกชื่อ!" }]}
            >
              <Input disabled={registerReducer.isFetching} placeholder="ชื่อ" />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "กรุณากรอกนามสกุล!" }]}
            >
              <Input
                disabled={registerReducer.isFetching}
                placeholder="นามสกุล"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "ข้อมูลอีเมลไม่ถูกต้อง!",
                },
                {
                  required: true,
                  message: "กรุณากรอกอีเมล!",
                },
              ]}
            >
              <Input
                disabled={registerReducer.isFetching}
                prefix={<MailOutlined />}
                placeholder="อีเมล"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกหมายเลขโทรศัพท์!",
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (value.length !== 9) {
                      return Promise.reject("หมายเลขโทรศัพท์ไม่ถูกต้อง!");
                    }
                    if (value.startsWith("0")) {
                      return Promise.reject(
                        "หมายเลขโทรศัพท์ต้องไม่เริ่มต้นด้วยเลข 0!"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              {registerReducer.isFailed && (
                <Alert message="ลงทะเบียนไม่สำเร็จ" type="error" showIcon />
              )}

              <Input
                disabled={registerReducer.isFetching}
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <br />
            <Form.Item>
              <Row gutter={8}>
                <Col span={12}>
                  <Button
                    block
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: "8px" }}
                    disabled={registerReducer.isFetching}
                    onClick={() => navigate("/login")}
                  >
                    ยกเลิก
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    block
                    type="primary"
                    loading={registerReducer.isFetching}
                    disabled={registerReducer.isFetching}
                    htmlType="submit"
                  >
                    ลงทะเบียน
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
export default RegisterPage;
