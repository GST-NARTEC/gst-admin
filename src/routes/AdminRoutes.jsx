import { Route, Routes, Navigate } from "react-router-dom";
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

import Navigation from "../pages/WebsitesManagement/GSTSA/Navigation";
import Media from "../pages/WebsitesManagement/GSTSA/Media";

import Addons from "../pages/Addons/Addons";

// Pages Management
import Pages from "../pages/WebsitesManagement/GSTSA/Pages";
import HomePage from "../components/managePages/homePage/HomePage";
import PageTemplates from "../pages/WebsitesManagement/GSTSA/PageTemplates";
import PageTemplatesSetup from "../pages/WebsitesManagement/GSTSA/PageTemplatesSetup";
import PageTemplatesGallery from "../pages/WebsitesManagement/GSTSA/PageTemplatesGallery";

// Template 1 Management
import Template1 from "../components/pageTemplates/pageTemplatesGallery/Template1/Template1";
import AddTemplate1 from "../components/pageTemplates/pageTemplatesGallery/Template1/AddTemplate1";
import ViewTemplate1 from "../components/pageTemplates/pageTemplatesGallery/Template1/ViewTemplate1";
import EditTemplate1 from "../components/pageTemplates/pageTemplatesGallery/Template1/EditTemplate1";

// Template 2 Management
import Template2 from "../components/pageTemplates/pageTemplatesGallery/Template2/Template2";
import AddTemplate2 from "../components/pageTemplates/pageTemplatesGallery/Template2/AddTemplate2";
import ViewTemplate2 from "../components/pageTemplates/pageTemplatesGallery/Template2/ViewTemplate2";
import EditTemplate2 from "../components/pageTemplates/pageTemplatesGallery/Template2/EditTemplate2";

// Template 3 Management
import Template3 from "../components/pageTemplates/pageTemplatesGallery/Template3/Template3";
import AddTemplate3 from "../components/pageTemplates/pageTemplatesGallery/Template3/AddTemplate3";
import EditTemplate3 from "../components/pageTemplates/pageTemplatesGallery/Template3/EditTemplate3";
import ViewTemplate3 from "../components/pageTemplates/pageTemplatesGallery/Template3/ViewTemplate3";

// Template 4 Management
import Template4 from "../components/pageTemplates/pageTemplatesGallery/Template4/Template4";
import AddTemplate4 from "../components/pageTemplates/pageTemplatesGallery/Template4/AddTemplate4";
import EditTemplate4 from "../components/pageTemplates/pageTemplatesGallery/Template4/EditTemplate4";
import ViewTemplate4 from "../components/pageTemplates/pageTemplatesGallery/Template4/ViewTemplate4";

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

      <Route path="/admin/addons" element={<Addons />} />

      <Route path="/admin/members" element={<Members />} />
      <Route path="/admin/view-member/:id" element={<ViewMember />} />

      <Route path="/admin/*" element={<NotFound />} />

      {/* Websites Management */}
      <Route path="/admin/gstsa1/navigation" element={<Navigation />} />
      <Route path="/admin/gstsa1/media" element={<Media />} />

      {/* Pages Management with nested routes */}
      <Route path="/admin/gstsa1/pages" element={<Pages />}>
        <Route index element={null} />
        <Route path="home" element={<HomePage />} />
      </Route>

      {/* Page Templates Management */}
      <Route path="/admin/gstsa1/page-templates" element={<PageTemplates />}>
        <Route index element={<Navigate to="page-setup" replace />} />
        <Route path="page-setup" element={<PageTemplatesSetup />} />
        <Route path="templates" element={<PageTemplatesGallery />} />
      </Route>

      {/* Template Management Routes */}
      <Route path="/admin/gstsa1/page-templates/templates/template1">
        <Route index element={<Template1 />} />
        <Route path="add" element={<AddTemplate1 />} />
        <Route path="edit/:id" element={<EditTemplate1 />} />
        <Route path="view/:id" element={<ViewTemplate1 />} />
      </Route>

      <Route path="/admin/gstsa1/page-templates/templates/template2">
        <Route index element={<Template2 />} />
        <Route path="add" element={<AddTemplate2 />} />
        <Route path="view/:id" element={<ViewTemplate2 />} />
        <Route path="edit/:id" element={<EditTemplate2 />} />
      </Route>

      <Route path="/admin/gstsa1/page-templates/templates/template3">
        <Route index element={<Template3 />} />
        <Route path="add" element={<AddTemplate3 />} />
        <Route path="edit/:id" element={<EditTemplate3 />} />
        <Route path="view/:id" element={<ViewTemplate3 />} />
      </Route>

      <Route path="/admin/gstsa1/page-templates/templates/template4">
        <Route index element={<Template4 />} />
        <Route path="add" element={<AddTemplate4 />} />
        <Route path="edit/:id" element={<EditTemplate4 />} />
        <Route path="view/:id" element={<ViewTemplate4 />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
