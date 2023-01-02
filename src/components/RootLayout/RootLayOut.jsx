import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../modules/Home/Footer/Footer";
import { NavMenu } from "../Nav/NavMenu";

const RootLayOut = () => {
  return (
    <div>
      <NavMenu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayOut;
