import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "./context/AuthContext";

const ProtectedRoutes = () => {
  const {
    state: { user },
  } = useContext(Context);

  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
