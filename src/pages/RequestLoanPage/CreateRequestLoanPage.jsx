import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  DatePicker,
  Modal,
  AutoComplete,
} from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as userAction from "../../redux/actions/user.action";

const RequestLoanPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const user = useSelector((state) => state.loginReducer.user);
  const users = useSelector((state) => state.userReducer.users);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Dispatch action to request loan
    // dispatch(loanActions.requestLoan(values))
  };
  const [modalOpen, setModalOpen] = useState(false);

  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      dispatch(userAction.loadUsers());
      form.resetFields();
    }
  }, [modalOpen, form, dispatch]);

  const options = users.map((user) => ({
    value: user.id,
    label: user.fullName,
  }));

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setModalOpen(true)}
      >
        สร้างคำร้องขอยืมเงิน
      </Button>
      <Modal
        onCancel={handleCancel}
        title="คำร้องขอยืมเงิน"
        centered
        open={modalOpen}
        footer={[]}
      >
        <br />
        <Form
          form={form}
          name="request_loan"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            senderId: user.id,
            sender_fullName: user.username,
            // receiverId: null,
            // receiver_fullName: null,
            date: moment(),
            amount: 0,
          }}
        >
          <Form.Item name="sender_fullName" label="ผู้ยืม">
            <Input
              user
              disabled
              prefix={<UserOutlined />}
              placeholder="ผู้ยืม"
            />
          </Form.Item>

          <Form.Item name="senderId" hidden>
            <Input value={user.id} />
          </Form.Item>

          <Form.Item
            name="receiverId"
            label="ผู้ให้ยืม"
            rules={[{ required: true, message: "กรุณาเลือกผู้ให้ยืม" }]}
          >
            <AutoComplete
              options={options}
              placeholder="เลือกผู้ให้ยืม"
              filterOption={(inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !==
                -1
              }
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label="จำนวนเงิน"
            rules={[
              { required: true, message: "กรุณากรอกจำนวนเงิน" },
              {
                validator: (_, value) =>
                  value > 0
                    ? Promise.resolve()
                    : Promise.reject("จำนวนเงินต้องมากกว่า 0"),
              },
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              formatter={(value) =>
                `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/฿\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="date"
            label="วันที่ยืม"
            rules={[{ required: true, message: "กรุณาเลือกวันที่ยืม" }]}
          >
            <DatePicker disabled style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="description" label="รายละเอียด">
            <Input.TextArea rows={4} placeholder="รายละเอียดการยืมเงิน" />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleCancel} style={{ marginRight: "8px" }}>
              ยกเลิก
            </Button>
            <Button type="primary" htmlType="submit">
              ส่งคำขอ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RequestLoanPage;
