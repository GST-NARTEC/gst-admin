import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Website/home/Home";
import NotFound from "../pages/NotFound";
import Template1Design from "../pages/Website/Templates/Template1Design";
function WebsiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/template1" element={<Template1Design />} />
      {/* <Route path="/*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default WebsiteRoutes;
