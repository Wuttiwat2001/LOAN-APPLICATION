import { useEffect, useState } from "react";
import "./TransactionSenderBorrow.css";
import { useSelector, useDispatch } from "react-redux";
import * as transactionSenderBorrowAction from "../../redux/actions/transactionSenderBorrow.action";
import * as repayAction from "../../redux/actions/repay.action";
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
} from "antd";
const { Title, Text } = Typography;
import {
  SearchOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import en from "antd/es/date-picker/locale/en_US";
import moment from "moment";
const { RangePicker } = DatePicker;

const ListTransactionSenderBorrowPage = () => {
  const locale = {
    ...en,
    lang: {
      ...en.lang,
      placeholder: "เลือกวันที่",
      rangePlaceholder: ["วันเริ่มต้น", "วันที่สิ้นสุด"],
    },
  };

  const transactionSenderBorrowReducer = useSelector(
    (state) => state.transactionSenderBorrowReducer
  );

  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState(["", ""]);

  const dispatch = useDispatch();

  const repay = async (id) => {
    await dispatch(repayAction.repay(id));
    await dispatch(transactionSenderBorrowAction.loadTransactions(1, 10, searchText, searchDate));  
    
  }

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
      title: "ประเภท",
      dataIndex: "type",
      key: "type",
      render: (text) => {
        let color = "";
        if (text === "ยืมเงิน") {
          color = "red";
        } else {
          color = "success";
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
      render: (text) => {
        return (
          <div>
            <Text strong>
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(text)}
            </Text>
          </div>
        );
      },
    },
    {
      title: "สถานะ",
      key: "isBorrow",
      dataIndex: "isBorrow",
      render: (text) => (
        <div>
          <div>
            <Tag color={text ? "green" : "gold"}>
              {" "}
              {text ? "ชำระแล้ว" : "ยังไม่ชำระ"}
            </Tag>
          </div>
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
      title: "",
      dataIndex: "action",
      render: (_, record) => {
        const isDisabledPay = record.isBorrow;
        return (
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "8px" }}>
              <Popconfirm
                title="คุณต้องการชำระเงินใช่หรือไม่ ?"
                onConfirm={() => {
                  repay(record.id);
                }}
                okText="ตกลง"
                cancelText="ยกเลิก"
              >
                <Button
                  color="primary"
                  variant="outlined"
                  disabled={isDisabledPay}
                >
                  {isDisabledPay ? "ชำระแล้ว" : "ชำระเงิน"}
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
      transactionSenderBorrowAction.loadTransactions(1, 10, searchText, searchDate)
    );
  }, []);

  const dataSourceWithKeys = transactionSenderBorrowReducer.transactions.map(
    (transaction) => ({
      ...transaction,
      key: transaction.id,
    })
  );

  const handleChangePageSize = (value) => {
    dispatch(
      transactionSenderBorrowAction.loadTransactions(1, value, searchText, searchDate)
    );
  };

  const handleTableChange = (page, pageSize) => {
    dispatch(
      transactionSenderBorrowAction.loadTransactions(
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
      transactionSenderBorrowAction.loadTransactions(1, 10, searchText, dateString)
    );
  };
  const startItem =
    (transactionSenderBorrowReducer.page - 1) *
      transactionSenderBorrowReducer.pageSize +
    1;
  const endItem = Math.min(
    transactionSenderBorrowReducer.page *
      transactionSenderBorrowReducer.pageSize,
    transactionSenderBorrowReducer.totalTransactions
  );

  return (
    <>
      <Title style={{ marginBottom: "24px", marginTop: "24px" }} level={3}>
        คืนเงิน
      </Title>

      <Row style={{ marginBottom: "24px" }} gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Card bordered={false}>
            <Statistic
              title={`ชำระแล้ว ${transactionSenderBorrowReducer.paidTransactions.count} รายการ`}
              value={new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(transactionSenderBorrowReducer.paidTransactions.amount)}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<CheckOutlined />}
            ></Statistic>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Card bordered={false}>
            <Statistic
              title={`ค้างชำระ ${transactionSenderBorrowReducer.outstandingTransactions.count} รายการ`}
              value={new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(transactionSenderBorrowReducer.outstandingTransactions.amount)}
              valueStyle={{
                color: "#d48806",
              }}
              prefix={<ExclamationCircleOutlined />}
            ></Statistic>
          </Card>
        </Col>
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
              รายการยืมเงิน
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
                  transactionSenderBorrowAction.loadTransactions(1, 10, searchText)
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
          loading={transactionSenderBorrowReducer.isFetching}
          columns={columns}
          dataSource={dataSourceWithKeys}
          pagination={false}
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
                {transactionSenderBorrowReducer.totalTransactions} รายการ
              </Text>
            </div>
            <Pagination
              current={transactionSenderBorrowReducer.page}
              pageSize={transactionSenderBorrowReducer.pageSize}
              total={transactionSenderBorrowReducer.totalTransactions}
              onChange={handleTableChange}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ListTransactionSenderBorrowPage;
