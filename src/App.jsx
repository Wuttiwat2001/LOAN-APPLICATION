import React, { useState,useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppMenu from "./components/AppMenu";
import AppContent from "./components/AppContent";

import { useSelector, useDispatch } from "react-redux";
import * as loginAction from "./redux/actions/login.action";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const loginReducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginAction.restoreLogin());
  }, []);
  
  return (
    <Router>
      <div style={{ height: "100vh" }}>
        <Layout style={{ height: "100%" }}>
          {loginReducer.isLogin && <AppMenu collapsed={collapsed} />}
          <Layout>
            {loginReducer.isLogin && (
              <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
            )}
            <AppContent />
          </Layout>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
