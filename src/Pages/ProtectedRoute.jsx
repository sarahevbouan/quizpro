import { getSessionStorageItem } from "../Utils/utils";
import Home from "./Home";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const activeUserId = getSessionStorageItem("activeUserId");
  if (!activeUserId) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
