import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  DatePicker,
  Modal,
  Select,
  Spin,
  message,
} from "antd";
const { Option } = Select;
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as userAction from "../../redux/actions/user.action";
import * as requestAction from "../../redux/actions/request.action";

const RequestLoanPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const user = useSelector((state) => state.loginReducer.user);
  const users = useSelector((state) => state.userReducer.users);
  const filteredUsers = users.filter((u) => u.id !== user.id);
  const requestReducer = useSelector((state) => state.requestReducer);

  const onFinish = async (values) => {
    await dispatch(requestAction.requestBorrow(values));

    if (requestReducer.isSuccess) {
      message.success("คำร้องขอยืมเงินสำเร็จ");
      setModalOpen(false);
    } else {
      message.error("คำร้องขอยืมเงินไม่สำเร็จ");
      setModalOpen(false);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleConfirmCancel = () => {
    setConfirmModalOpen(false);
  };

  const handleConfirm = () => {
    form.submit();
    setConfirmModalOpen(false);
  };

  const handleSendRequest = () => {
    form
      .validateFields()
      .then(() => {
        setConfirmModalOpen(true);
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      dispatch(userAction.loadUsers());
      form.resetFields();
    }
  }, [modalOpen, form, dispatch]);

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
        maskClosable={false}
        keyboard={false}
      >
        <br />
        <Spin spinning={requestReducer.isFetching}>
          <Form
            form={form}
            name="create_request_loan"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              senderId: user.id,
              sender_fullName: user.username,
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
              <Select placeholder="เลือกผู้ให้ยืม">
                {filteredUsers.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.fullName}
                  </Option>
                ))}
              </Select>
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
              <Button
                disabled={requestReducer.isFetching}
                onClick={handleCancel}
                style={{ marginRight: "8px" }}
              >
                ยกเลิก
              </Button>
              <Button
                loading={requestReducer.isFetching}
                disabled={requestReducer.isFetching}
                type="primary"
                onClick={handleSendRequest}
              >
                ส่งคำขอ
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      <Modal
        width={320}
        visible={confirmModalOpen}
        onCancel={handleConfirmCancel}
        title="ยืนยันการส่งคำร้อง"
        centered
        footer={[
          <Button key="back" onClick={handleConfirmCancel}>
            ยกเลิก
          </Button>,
          <Button type="primary" key="submit" onClick={handleConfirm}>
            ยืนยัน
          </Button>,
        ]}
        maskClosable={false}
        keyboard={false}
      >
        <p>คุณต้องการส่งคำร้องขอยืมเงินหรือไม่?</p>
      </Modal>
    </>
  );
};

export default RequestLoanPage;
