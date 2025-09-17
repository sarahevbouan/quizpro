import { getStorageItem } from "../Utils/utils";
import Home from "./Home";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const activeUserId = getStorageItem(sessionStorage, "activeUserId");
  if (!activeUserId) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
