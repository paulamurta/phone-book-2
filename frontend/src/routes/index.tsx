import { Route, Routes, Navigate } from "react-router-dom";
import Contacts from "../pages/Contacts";
import Login from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";

export default function RoutesMain() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/contacts"
        element={
          <ProtectedRoutes>
            <Contacts />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}
