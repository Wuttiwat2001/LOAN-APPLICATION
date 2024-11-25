import React from "react";
import "./RequestLoan.css";
import { useNavigate } from "react-router-dom";
import CreateRequestLoanPage from './CreateRequestLoanPage'
import moment from "moment";

import {
  Card,
  Space,
  Table,
  Tag,
  Typography,
  Input,
  Button,
  Select,
  Layout,
  Col,
  Row,
  Divider,
} from "antd";
const { Title } = Typography;
import {
  SearchOutlined,
  ExportOutlined,
} from "@ant-design/icons";

import { useDispatch } from "react-redux";
// import * as loanActions from "../../redux/actions/loanActions";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const { Content } = Layout;
const { Option } = Select;

const RequestLoanPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

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
            />
            <div style={{ display: "flex", marginLeft: "auto" }}>
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                  marginRight: "8px",
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                    disabled: true,
                  },
                ]}
              />
              <Button
                variant="outlined"
                color="primary"
                icon={<ExportOutlined />}
              >
                Export
              </Button>
            </div>
          </Col>
        </Row>

        <Table columns={columns} dataSource={data} />
      </Card>
    </>
  );
};

export default RequestLoanPage;
