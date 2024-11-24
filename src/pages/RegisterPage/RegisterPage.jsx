import React from "react";
import { Row, Col, Typography, Card, Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as registerAction from "../../redux/actions/register.action";
import { useSelector, useDispatch } from "react-redux";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const registerReducer = useSelector((state) => state.registerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(registerAction.register(values, navigate));
  };

  return (
    <Card style={{ width: 400, height: 420 }}>
      <Typography.Title
        level={3}
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        ลงทะเบียนใช้งาน
      </Typography.Title>
      <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
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
          name="username"
          rules={[{ required: true, message: "กรุณากรอกรหัสผู้ใช้งาน!" }]}
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
    </Card>
  );
};
export default RegisterPage;
