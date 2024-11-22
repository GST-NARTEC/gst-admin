import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Settings from "../pages/settings/Settings";
import Currency from "../pages/settings/Currency";
import Tax from "../pages/settings/Tax";
import Categories from "../pages/categories/Categories";
import Products from "../pages/products/Products";
import AddProduct from "../pages/products/AddProduct";
import EditProduct from "../pages/products/EditProduct";
import NotFound from "../pages/NotFound";

import Members from "../pages/members/Members";
import ViewMember from "../pages/members/ViewMember";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/settings" element={<Settings />}>
        <Route path="currency" element={<Currency />} />
        <Route path="tax" element={<Tax />} />
        {/* Add other settings routes here */}
      </Route>
      <Route path="/admin/categories" element={<Categories />} />

      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/edit-product/:id" element={<EditProduct />} />

      <Route path="/admin/members" element={<Members />} />
      <Route path="/admin/view-member/:id" element={<ViewMember />} />

      <Route path="/admin/*" element={<NotFound />} />
    </Routes>
  );
}

export default AdminRoutes;
