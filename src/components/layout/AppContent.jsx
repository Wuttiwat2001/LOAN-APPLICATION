import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;

//page
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ListRequestSenderPage from "../../pages/RequestSenderPage/ListRequestSenderPage";
import ListRequestReceiverPage from "../../pages/RequestReceiverPage/ListRequestReceiverPage";

import ListTransactionPage from "../../pages/TransactionPage/ListTransactionPage";
import ListTransactionSenderBorrowPage from "../../pages/TransactionSenderBorrowPage/ListTransactionSenderBorrowPage";
import ListTransactionReceiverBorrowPage from "../../pages/TransactionReceiverBorrowPage/ListTransactionReceiverBorrowPage";

// guard router
import PublicRoutes from "../../utils/PublicRoutes";
import ProtectedRoutes from "../../utils/ProtectedRoutes";

const AppContent = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route
          path="/login"
          element={
            <Content
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoginPage />
            </Content>
          }
        />
        <Route
          path="/register"
          element={
            <Content
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RegisterPage />
            </Content>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route
          path="/request-receiver"
          element={
            <Content
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                borderRadius: "8px",
                overflow: "auto",
              }}
            >
              <ListRequestReceiverPage />
            </Content>
          }
        />

        <Route
          path="/transaction-sender-borrow"
          element={
            <Content
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                borderRadius: "8px",
                overflow: "auto",
              }}
            >
              <ListTransactionSenderBorrowPage />
            </Content>
          }
        />

        <Route
          path="/transaction-receiver-borrow"
          element={
            <Content
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                borderRadius: "8px",
                overflow: "auto",
              }}
            >
              <ListTransactionReceiverBorrowPage />
            </Content>
          }
        />

        <Route
          path="/request-sender"
          element={
            <Content
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                borderRadius: "8px",
                overflow: "auto",
              }}
            >
              <ListRequestSenderPage />
            </Content>
          }
        />

        <Route
          path="/transaction"
          element={
            <Content
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                borderRadius: "8px",
                overflow: "auto",
              }}
            >
              {<ListTransactionPage />}
            </Content>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppContent;
