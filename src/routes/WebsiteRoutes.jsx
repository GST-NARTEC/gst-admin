import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Website/home/Home";
import NotFound from "../pages/NotFound";
function WebsiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default WebsiteRoutes;
