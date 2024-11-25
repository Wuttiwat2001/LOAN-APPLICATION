import React, { useEffect, useState } from "react";
import "./RequestReceiver.css";
import { useSelector, useDispatch } from "react-redux";
import * as requestReceiverAction from "../../redux/actions/requestReceiver.action";
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
  Space,
  DatePicker,
  Statistic,
  Popconfirm,
  Button,
} from "antd";
const { Title, Text } = Typography;
import {
  SearchOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import en from "antd/es/date-picker/locale/en_US";
import moment from "moment";
const { RangePicker } = DatePicker;

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
  {
    title: "operation",
    dataIndex: "operation",
    render: (_, record) => (
      <>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "8px" }}>
            <Popconfirm
              title="คุณต้องการอนุมัติคำร้องใช่หรือไม่ ?"
              onConfirm={() => console.log(record)}
              okText="ตกลง"
              cancelText="ยกเลิก"
            >
              <Button
                style={{
                  color:
                    record.status === "รอดำเนินการ" ? "#3F8600" : undefined,
                  borderColor:
                    record.status === "รอดำเนินการ" ? "#3F8600" : undefined,
                }}
                variant="outlined"
                disabled={record.status !== "รอดำเนินการ"}
              >
                อนุมัติ
              </Button>
            </Popconfirm>
          </div>
          <div>
            <Popconfirm
              title="คุณต้องการปฏิเสธคำร้องใช่หรือไม่ ?"
              onConfirm={() => console.log(record)}
              okText="ตกลง"
              cancelText="ยกเลิก"
            >
              <Button
                style={{
                  color:
                    record.status === "รอดำเนินการ" ? "#cf1322" : undefined,
                  borderColor:
                    record.status === "รอดำเนินการ" ? "#cf1322" : undefined,
                }}
                variant="outlined"
                disabled={record.status !== "รอดำเนินการ"}
              >
                ปฏิเสธ
              </Button>
            </Popconfirm>
          </div>
        </div>
      </>
    ),
  },
];

const statusOptions = [
  {
    label: "รอดำเนินการ",
    value: "รอดำเนินการ",
  },
  {
    label: "อนุมัติ",
    value: "อนุมัติ",
  },
  {
    label: "ปฏิเสธ",
    value: "ปฏิเสธ",
  },
];

const locale = {
  ...en,
  lang: {
    ...en.lang,
    placeholder: "เลือกวันที่",
    rangePlaceholder: ["วันเริ่มต้น", "วันที่สิ้นสุด"],
  },
};

const ListRequestReceiverPage = () => {
  const requestReceiverReducer = useSelector(
    (state) => state.requestReceiverReducer
  );
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState(["", ""]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      requestReceiverAction.loadRequestReceivers(1, 10, searchText, searchDate)
    );
  }, []);

  const dataSourceWithKeys = requestReceiverReducer.requests.map(
    (request, index) => ({
      ...request,
      key: request.id,
    })
  );

  const handleChangePageSize = (value) => {
    dispatch(
      requestReceiverAction.loadRequestReceivers(
        1,
        value,
        searchText,
        searchDate
      )
    );
  };

  const handleTableChange = (page, pageSize) => {
    dispatch(
      requestReceiverAction.loadRequestReceivers(
        page,
        pageSize,
        searchText,
        searchDate
      )
    );
  };

  const onChangeDate = (date, dateString) => {
    setSearchDate(dateString);
    dispatch(
      requestReceiverAction.loadRequestReceivers(1, 10, searchText, dateString)
    );
  };

  const handleSuccess = () => {
    dispatch(requestReceiverAction.loadRequestReceivers(1, 10, "", ["", ""]));
    setSearchDate(["", ""]);
    setSearchText("");
  };

  const startItem =
    (requestReceiverReducer.page - 1) * requestReceiverReducer.pageSize + 1;
  const endItem = Math.min(
    requestReceiverReducer.page * requestReceiverReducer.pageSize,
    requestReceiverReducer.totalRequests
  );

  return (
    <>
      <Title style={{ marginBottom: "24px", marginTop: "24px" }} level={3}>
        รายการคำร้องขอยืมเงิน
      </Title>

      <Row style={{ marginBottom: "24px" }} gutter={16}>
        {requestReceiverReducer.statusCount.map((status, index) => (
          <Col span={8} key={index}>
            <Card bordered={false}>
              <Statistic
                title={status.status}
                value={`${status.countStatus} รายการ`}
                valueStyle={{
                  color:
                    status.status === "ปฏิเสธ"
                      ? "#cf1322"
                      : status.status === "รอดำเนินการ"
                      ? "#d46b08"
                      : "#3f8600",
                }}
                prefix={
                  status.status === "ปฏิเสธ" ? (
                    <CloseOutlined />
                  ) : status.status === "รอดำเนินการ" ? (
                    <ClockCircleOutlined />
                  ) : (
                    <CheckOutlined />
                  )
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

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
          </Col>
        </Row>
        <Row
          gutter={[8]}
          style={{
            marginBottom: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <Col span={8}>
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              defaultValue={[]}
              placeholder="กรองตามสถานะ"
              options={statusOptions}
              optionRender={(option) => (
                <Space>
                  <span>{option.data.label}</span>
                </Space>
              )}
            />
          </Col>

          <Col span={8}>
            <RangePicker
              onChange={onChangeDate}
              style={{
                width: "100%",
              }}
              locale={locale}
            />
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
                  requestReceiverAction.loadRequestReceivers(1, 10, searchText)
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
                onChange={handleChangePageSize}
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
          loading={requestReceiverReducer.isFetching}
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
                {requestReceiverReducer.totalRequests} รายการ
              </Text>
            </div>
            <Pagination
              current={requestReceiverReducer.page}
              pageSize={requestReceiverReducer.pageSize}
              total={requestReceiverReducer.totalRequests}
              onChange={handleTableChange}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ListRequestReceiverPage;
