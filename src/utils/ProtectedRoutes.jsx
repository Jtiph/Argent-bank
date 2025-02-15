import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const token = useSelector((state) => state.auth.token); // Vérifie le token dans Redux

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoutes;
