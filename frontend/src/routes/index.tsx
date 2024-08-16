import { Route, Routes, Navigate } from "react-router-dom";
import Contacts from "../pages/Contacts";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../pages/Login";

export default function RoutesMain() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contacts" element={<Contacts />} />
      {/* <Route
        path="/contacts"
        element={
          <ProtectedRoutes>
            <Contacts />
          </ProtectedRoutes>
        }
      /> */}
    </Routes>
  );
}
