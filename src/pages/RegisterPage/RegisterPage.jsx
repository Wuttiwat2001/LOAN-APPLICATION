import React from "react";
import { Typography, Card, Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const RegisterPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Card style={{ width: 400 }}>
      <Typography.Title
        level={3}
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        ลงทะเบียนใช้งาน ยืมมั้ย !
      </Typography.Title>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="อีเมล"
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
          <Input prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="username"
          label="รหัสผู้ใช้งาน"
          rules={[{ required: true, message: "กรุณากรอกรหัสผู้ใช้งาน!" }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          label="รหัสผ่าน"
          rules={[
            {
              required: true,
              message: "กรุณากรอกรหัสผ่าน!",
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="ยืนยันรหัสผ่าน"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
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
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
          >
            ยกเลิก
          </Button>
          <Button type="primary" htmlType="submit">
            ลงทะเบียน
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default RegisterPage;
