import { Route, Routes } from "react-router-dom";
import MembershipForm from "../pages/registration/MembershipForm";
import Barcodes from "../pages/registration/Barcodes";
import Payment from "../pages/registration/Payment";
import Stepper from "../pages/registration/Stepper";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Stepper />}>
        <Route path="membership-form" element={<MembershipForm />} />
        <Route path="barcodes" element={<Barcodes />} />
        <Route path="payment" element={<Payment />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
