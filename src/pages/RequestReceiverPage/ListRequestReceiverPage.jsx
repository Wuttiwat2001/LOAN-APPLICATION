import { useEffect, useState } from "react";
import "./RequestReceiver.css";
import { useSelector, useDispatch } from "react-redux";
import * as requestReceiverAction from "../../redux/actions/requestReceiver.action";
import * as requestEdit from "../../redux/actions/requestEdit.action";
import * as userAction from "../../redux/actions/user.action";
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
  DatePicker,
  Statistic,
  Popconfirm,
  Button,
  Tooltip,
} from "antd";
const { Title, Text } = Typography;
import {
  SearchOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import en from "antd/es/date-picker/locale/en_US";
import moment from "moment";
const { RangePicker } = DatePicker;

const ListRequestReceiverPage = () => {



  const locale = {
    ...en,
    lang: {
      ...en.lang,
      placeholder: "เลือกวันที่",
      rangePlaceholder: ["วันเริ่มต้น", "วันที่สิ้นสุด"],
    },
  };

  const requestReceiverReducer = useSelector(
    (state) => state.requestReceiverReducer
  );
  const balance = useSelector((state) => state.userReducer.balance);

  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState(["", ""]);

  const dispatch = useDispatch();

  
  const approveRequest = async (status, id) => {
    await dispatch(requestEdit.edit(status, id));
    await dispatch(
      requestReceiverAction.loadRequestReceivers(1, 10, searchText, searchDate)
    );
    await dispatch(userAction.loadUserBalance());
  };

  const rejectRequest = async (status, id) => {
    await dispatch(requestEdit.edit(status, id));
    await dispatch(
      requestReceiverAction.loadRequestReceivers(1, 10, searchText, searchDate)
    );
  };


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
      render: (text, record) => {
        const warningIcon = balance < record.amount;
        return (
          <div>
            <Text style={{ marginRight: "8px" }} strong>
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(text)}
            </Text>
            <Tooltip title="จำนวนเงินไม่พอ">
              {warningIcon && (
                <ExclamationCircleOutlined
                  style={{
                    color: "gold",
                  }}
                />
              )}
            </Tooltip>
          </div>
        );
      },
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
      title: "",
      dataIndex: "action",
      render: (_, record) => {
        const isDisabledApprove =
          record.status !== "รอดำเนินการ" || balance < record.amount;
        const isDisabledReject = record.status !== "รอดำเนินการ";

        return (
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "8px" }}>
              <Popconfirm
                title="คุณต้องการอนุมัติคำร้องใช่หรือไม่ ?"
                onConfirm={() => {
                  approveRequest("อนุมัติ", record.id);
                }}
                okText="ตกลง"
                cancelText="ยกเลิก"
              >
                <Button
                  style={{
                    color: !isDisabledApprove ? "#3F8600" : undefined,
                    borderColor: !isDisabledApprove ? "#3F8600" : undefined,
                  }}
                  variant="outlined"
                  disabled={isDisabledApprove}
                >
                  อนุมัติ
                </Button>
              </Popconfirm>
            </div>
            <div>
              <Popconfirm
                title="คุณต้องการปฏิเสธคำร้องใช่หรือไม่ ?"
                onConfirm={() => {
                  rejectRequest("ปฏิเสธ", record.id);
                }}
                okText="ตกลง"
                cancelText="ยกเลิก"
              >
                <Button
                  style={{
                    color: !isDisabledReject ? "#cf1322" : undefined,
                    borderColor: !isDisabledReject ? "#cf1322" : undefined,
                  }}
                  variant="outlined"
                  disabled={isDisabledReject}
                >
                  ปฏิเสธ
                </Button>
              </Popconfirm>
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(
      requestReceiverAction.loadRequestReceivers(1, 10, searchText, searchDate)
    );
  }, []);

  const dataSourceWithKeys = requestReceiverReducer.requests.map((request) => ({
    ...request,
    key: request.id,
  }));

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



  const startItem =
    (requestReceiverReducer.page - 1) * requestReceiverReducer.pageSize + 1;
  const endItem = Math.min(
    requestReceiverReducer.page * requestReceiverReducer.pageSize,
    requestReceiverReducer.totalRequests
  );

  return (
    <>
      <Title style={{ marginBottom: "24px", marginTop: "24px" }} level={3}>
        คำร้อง
      </Title>

      <Row style={{ marginBottom: "24px" }} gutter={[16, 16]}>
        {requestReceiverReducer.statusCount.map((status, index) => (
          <Col xs={24} sm={24} md={12} lg={8} xl={8} key={index}>
            <Card>
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
              รายการคำร้องขอยืมเงิน
            </Title>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          style={{
            marginBottom: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
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
          gutter={[16, 16]}
          style={{
            marginBottom: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Input
              style={{ width: "100%" }}
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
          </Col>
          <Col
            style={{ display: "flex", justifyContent: "end" }}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
          >
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
