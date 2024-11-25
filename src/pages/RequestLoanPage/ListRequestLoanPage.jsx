import React, { useEffect, useState } from "react";
import "./RequestLoan.css";
import { useSelector, useDispatch } from "react-redux";
import CreateRequestLoanPage from "./CreateRequestLoanPage";
import * as requestSenderAction from "../../redux/actions/requestSender.action";
import {
  Avatar,
  Card,
  Table,
  Tag,
  Typography,
  Input,
  Select,
  Col,
  Row,
  Divider,
  Pagination,
} from "antd";
const { Title, Text } = Typography;
import { SearchOutlined, ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const columns = [
  {
    title: "คู่สัญญา",
    dataIndex: "counterparty",
    key: "counterparty",
    render: (text) => (
      <div>
        <Avatar
          style={{
            backgroundColor: "#1677ff",
            verticalAlign: "middle",
          }}
          size="large"
        >
          {text.charAt(0)}
        </Avatar>
        <Text style={{ marginLeft: "8px" }} strong>
          {text}
        </Text>
      </div>
    ),
  },
  {
    title: "สถานะ",
    dataIndex: "status",
    key: "status",
    render: (text) => {
      let color = "green";
      if (text === "รอดำเนินการ") {
        color = "orange";
      } else if (text === "ปฏิเสธ") {
        color = "red";
      }
      return (
        <div>
          <Tag color={color}>{text}</Tag>
        </div>
      );
    },
  },
  {
    title: "จำนวน",
    key: "amount",
    dataIndex: "amount",
    render: (text) => (
      <div>
        <Text strong>
          {new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
          }).format(text)}
        </Text>
      </div>
    ),
  },
  {
    title: "วันที่สร้าง",
    key: "createdAt",
    dataIndex: "createdAt",
    render: (text) => (
      <div>
        <ClockCircleOutlined />
        <Text style={{ marginLeft: "8px" }} type="secondary">
          {moment(text).format("DD/MM/YYYY HH:mm")}
        </Text>
      </div>
    ),
  },
  {
    title: "วันที่อัพเดท",
    key: "updatedAt",
    dataIndex: "updatedAt",
    render: (text) => (
      <div>
        <ClockCircleOutlined />
        <Text style={{ marginLeft: "8px" }} type="secondary">
          {moment(text).format("DD/MM/YYYY HH:mm")}
        </Text>
      </div>
    ),
  },
];
const RequestLoanPage = () => {
  const requestSenderReducer = useSelector(
    (state) => state.requestSenderReducer
  );
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestSenderAction.loadRequestSenders(1, 10, searchText));
  }, []);

  const dataSourceWithKeys = requestSenderReducer.requests.map(
    (request, index) => ({
      ...request,
      key: request.id,
    })
  );

  const handleChange = (value) => {
    dispatch(requestSenderAction.loadRequestSenders(1, value, searchText));
  };

  const handleTableChange = (page, pageSize) => {
    dispatch(
      requestSenderAction.loadRequestSenders(page, pageSize, searchText)
    );
  };

  const startItem =
    (requestSenderReducer.page - 1) * requestSenderReducer.pageSize + 1;
  const endItem = Math.min(
    requestSenderReducer.page * requestSenderReducer.pageSize,
    requestSenderReducer.totalRequests
  );

  return (
    <>
      <Title style={{ marginBottom: "24px", marginTop: "24px" }} level={3}>
        ขอยืมเงิน
      </Title>

      <Card className="cardStyle">
        <Row>
          <Col
            style={{
              padding: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            span={24}
          >
            <Title style={{ margin: 0 }} level={5}>
              รายการขอยืมเงิน
            </Title>
            <CreateRequestLoanPage />
          </Col>
        </Row>
        <Divider style={{ marginTop: "0px" }} />
        <Row
          style={{
            marginBottom: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            span={24}
          >
            <Input
              style={{ width: "400px" }}
              placeholder="ค้นหาข้อมูลในตาราง"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={() =>
                dispatch(
                  requestSenderAction.loadRequestSenders(
                    1,
                    10,
                    searchText
                  )
                )
              }
            />
            <div style={{ display: "flex", marginLeft: "auto" }}>
              <Select
                defaultValue={10}
                style={{
                  width: 120,
                  marginRight: "8px",
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 10,
                    label: 10,
                  },
                  {
                    value: 20,
                    label: 20,
                  },
                  {
                    value: 50,
                    label: 50,
                  },
                ]}
              />
            </div>
          </Col>
        </Row>

        <Table
          scroll={{
            y: 90 * 5,
          }}
          loading={requestSenderReducer.isFetching}
          columns={columns}
          dataSource={dataSourceWithKeys}
          pagination={false}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                รายละเอียดเพิ่มเติม : {record.description || "-"}
              </p>
            ),
          }}
        />
        <Row>
          <Col
            style={{
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
            }}
            span={24}
          >
            <div>
              <Text type="secondary">
                แสดงรายการ {startItem} - {endItem} จาก{" "}
                {requestSenderReducer.totalRequests} รายการ
              </Text>
            </div>
            <Pagination
              current={requestSenderReducer.page}
              pageSize={requestSenderReducer.pageSize}
              total={requestSenderReducer.totalRequests}
              onChange={handleTableChange}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default RequestLoanPage;
