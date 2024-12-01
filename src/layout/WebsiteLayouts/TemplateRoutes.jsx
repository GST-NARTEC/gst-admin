import React from "react";
import { Routes, Route } from "react-router-dom";
import Template1Design from "../../pages/Website/Templates/Template1Design";
import Template2Design from "../../pages/Website/Templates/Template2Design";
import Template3Design from "../../pages/Website/Templates/Template3Design";
import Template4Design from "../../pages/Website/Templates/Template4Design";

const templateComponents = {
  template1: Template1Design,
  template2: Template2Design,
  template3: Template3Design,
  template4: Template4Design,
};

function TemplateRoutes() {
  return (
    <Routes>
      {Object.entries(templateComponents).map(([template, Component]) => (
        <Route
          key={template}
          path={`/${template}/:slug`}
          element={<Component />}
        />
      ))}
    </Routes>
  );
}

export default TemplateRoutes;
