import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import * as transactionAction from "../../redux/actions/transaction.action";

const columns = [
  {
    title: "คู่สัญญา",
    dataIndex: "counterparty",
    key: "counterparty",
  },
  {
    title: "ประเภท",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "จำนวน",
    key: "amount",
    dataIndex: "amount",
  },
  {
    title: "วันที่สร้าง",
    key: "createdAt",
    dataIndex: "createdAt",
  },
];

const TransactionPage = () => {
  const transactionReducer = useSelector((state) => state.transactionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionAction.loadTransactions());
  }, [dispatch]);
  
  const dataSourceWithKeys = transactionReducer.transactions.map((transaction, index) => ({
    ...transaction,
    key: transaction.id 
  }));

  return (
    <>
      <Table columns={columns} dataSource={dataSourceWithKeys} />
    </>
  );
};

export default TransactionPage;