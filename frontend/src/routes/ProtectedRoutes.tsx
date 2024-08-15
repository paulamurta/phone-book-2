import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthGlobal } from "../contexts/AuthContext/useAuthGlobal";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { token } = useAuthGlobal();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
