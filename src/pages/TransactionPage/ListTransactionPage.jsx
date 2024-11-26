import { useEffect, useState } from "react";
import "./Transaction.css";
import { useSelector, useDispatch } from "react-redux";
import * as transactionAction from "../../redux/actions/transaction.action";
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
} from "antd";
const { Title, Text } = Typography;
import {
  SearchOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  RetweetOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import en from "antd/es/date-picker/locale/en_US";
import moment from "moment";
const { RangePicker } = DatePicker;

const ListTransactionPage = () => {
  const locale = {
    ...en,
    lang: {
      ...en.lang,
      placeholder: "เลือกวันที่",
      rangePlaceholder: ["วันเริ่มต้น", "วันที่สิ้นสุด"],
    },
  };

  const transactionReducer = useSelector((state) => state.transactionReducer);

  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState(["", ""]);

  const dispatch = useDispatch();

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
        if (text === "ยืมเงิน" || text === "ได้รับเงินคืน") {
          color = "green";
        } else {
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
      render: (text) => {
        return (
          <div>
            <Text
              style={{
                color: text < 0 ? "red" : undefined,
              }}
              strong
            >
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
  ];

  useEffect(() => {
    dispatch(transactionAction.loadTransactions(1, 10, searchText, searchDate));
  }, []);

  const dataSourceWithKeys = transactionReducer.transactions.map(
    (transaction) => ({
      ...transaction,
      key: transaction.id,
    })
  );

  const handleChangePageSize = (value) => {
    dispatch(
      transactionAction.loadTransactions(1, value, searchText, searchDate)
    );
  };

  const handleTableChange = (page, pageSize) => {
    dispatch(
      transactionAction.loadTransactions(page, pageSize, searchText, searchDate)
    );
  };

  const onChangeDate = (date, dateString) => {
    setSearchDate(dateString);
    dispatch(transactionAction.loadTransactions(1, 10, searchText, dateString));
  };
  const startItem =
    (transactionReducer.page - 1) * transactionReducer.pageSize + 1;
  const endItem = Math.min(
    transactionReducer.page * transactionReducer.pageSize,
    transactionReducer.totalTransactions
  );

  return (
    <>
      <Title style={{ marginBottom: "24px", marginTop: "24px" }} level={3}>
        ธุรกรรมของฉัน
      </Title>

      <Row style={{ marginBottom: "24px" }} gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Card bordered={false}>
            <Statistic
              title={`รายรับ ${transactionReducer.incomeTransactions.count} รายการ`}
              value={new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(transactionReducer.incomeTransactions.amount)}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
            ></Statistic>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Card bordered={false}>
            <Statistic
              title={`รายจ่าย ${transactionReducer.expenseTransactions.count} รายการ`}
              value={new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(transactionReducer.expenseTransactions.amount)}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<ArrowDownOutlined />}
            ></Statistic>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginBottom: "24px" }} gutter={[16, 16]}>
        {transactionReducer.typeCount.map((type, index) => (
          <Col xs={24} sm={24} md={12} lg={6} xl={6} key={index}>
            <Card bordered={false}>
              <Statistic
                title={type.type}
                value={`${type.countType} รายการ`}
                valueStyle={{
                  color:
                    type.type === "คืนเงิน" || type.type === "ให้ยืมเงิน"
                      ? "#cf1322"
                      : type.type === "ได้รับเงินคืน" || type.type === "ยืมเงิน"
                      ? "#3f8600"
                      : "#d46b08",
                }}
                prefix={
                  type.type === "คืนเงิน" ? (
                    <ArrowDownOutlined />
                  ) : type.type === "ยืมเงิน" ? (
                    <RetweetOutlined />
                  ) : type.type === "ได้รับเงินคืน" ? (
                    <ArrowUpOutlined />
                  ) : type.type === "ให้ยืมเงิน" ? (
                    <SwapOutlined />
                  ) : (
                    ""
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
              รายการธุรกรรม
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
                dispatch(transactionAction.loadTransactions(1, 10, searchText))
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
          loading={transactionReducer.isFetching}
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
                {transactionReducer.totalTransactions} รายการ
              </Text>
            </div>
            <Pagination
              current={transactionReducer.page}
              pageSize={transactionReducer.pageSize}
              total={transactionReducer.totalTransactions}
              onChange={handleTableChange}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ListTransactionPage;
