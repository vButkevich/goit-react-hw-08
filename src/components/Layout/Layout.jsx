// import React from "react";
import { Suspense } from "react";
// import { Outlet } from "react-router-dom";

import AppBar from "../AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <div id="layout" name="layout" className="layout">
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
      {/* <Outlet /> */}
    </div>
  );
};

export default Layout;
