import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Typography, Card, Button, Checkbox, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import * as loginAction from "../../redux/actions/login.action";
import { useSelector, useDispatch } from "react-redux";

const LoginPage = () => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(loginAction.login(values, navigate));
  };

  return (
    <Card style={{ width: 400, height: 420 }}>
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
      </Form>
    </Card>
  );
};

export default LoginPage;
