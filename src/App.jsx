import React, { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppMenu from "./components/AppMenu";
import AppContent from "./components/AppContent";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
    <div style={{ height: "100vh" }}>
      <Layout style={{ height: "100%" }}>
        <AppMenu collapsed={collapsed} />
        <Layout>
          <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <AppContent />
        </Layout>
      </Layout>
    </div>
    </Router>
  );
};

export default App;
