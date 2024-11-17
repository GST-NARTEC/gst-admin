import { Route, Routes } from "react-router-dom";
import MembershipForm from "../pages/auth/registration/MembershipForm";
import Barcodes from "../pages/auth/registration/Barcodes";
import Payment from "../pages/auth/registration/Payment";
import Stepper from "../pages/auth/registration/Stepper";
import Login from "../pages/auth/Login/Login";
import Dashboard from "../pages/dashboard/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<Stepper />}>
        <Route path="membership-form" element={<MembershipForm />} />
        <Route path="barcodes" element={<Barcodes />} />
        <Route path="payment" element={<Payment />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
