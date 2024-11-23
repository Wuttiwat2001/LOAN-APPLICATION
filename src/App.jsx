import React, { useState } from "react";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppMenu from "./components/AppMenu";
const { Content } = Layout;
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
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
    title: 'Action',
    key: 'action',
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
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ height: "100vh" }}>
      <Layout style={{ height: "100%" }}>
        <AppMenu collapsed={collapsed} />
        <Layout>
          <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              borderRadius: "8px",
              height: "100%",
            }}
          >
          <Table columns={columns} dataSource={data} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
