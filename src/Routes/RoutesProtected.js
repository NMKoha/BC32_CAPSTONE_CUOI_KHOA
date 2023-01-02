import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RouterProtected = ({ children }) => {
  const { user } = useSelector((state) => state.AuthSlice);
  const location = useLocation();
  if (!user) {
    const url = `/dangNhap?redirectURL=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  return children;
};

export default RouterProtected;
