import { Route, Routes } from "react-router-dom";
import MembershipForm from "../pages/auth/registration/MembershipForm";
import Barcodes from "../pages/auth/registration/Barcodes";
import Payment from "../pages/auth/registration/Payment";
import Stepper from "../pages/auth/registration/Stepper";
import Login from "../pages/auth/Login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Settings from "../pages/settings/Settings";
import Currency from "../pages/settings/Currency";
import Tax from "../pages/settings/Tax";
import Categories from "../pages/categories/Categories";
import Products from "../pages/products/Products";
import AddProduct from "../pages/products/AddProduct";
import Members from "../pages/members/Members";
import EditProduct from "../pages/products/EditProduct";

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
      <Route path="/settings" element={<Settings />}>
        <Route path="currency" element={<Currency />} />
        <Route path="tax" element={<Tax />} />
        {/* Add other settings routes here */}
      </Route>
      <Route path="/categories" element={<Categories />} />

      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />

      <Route path="/members" element={<Members />} />
    </Routes>
  );
}

export default AppRoutes;
