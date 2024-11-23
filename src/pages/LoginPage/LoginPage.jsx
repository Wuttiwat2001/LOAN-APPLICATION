import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Typography, Card, Button, Checkbox, Form, Input, Flex } from "antd";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Card style={{ width: 340 }}>
      <Typography.Title
        level={3}
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        ยืมมั้ย !
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
              <Checkbox>จดจำการเข้าสู่ระบบ</Checkbox>
            </Form.Item>
            <a href="">ลืมรหัสผ่าน</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            เข้าสู่ระบบ
          </Button>
        </Form.Item>
        <Flex justify="center" align="center">
          เพิ่งเคยเข้ามาในใช้ ยืมมั้ย ใช่หรือไม่&nbsp;
          <a href="">สมัครใหม่?</a>
        </Flex>
      </Form>
    </Card>
  );
};

export default LoginPage;
