import React from "react";
import { Routes, Route } from "react-router-dom";
import Template1Design from "../../pages/Website/Templates/Template1Design";
import Template2Design from "../../pages/Website/Templates/Template2Design";

const templateComponents = {
  template1: Template1Design,
  template2: Template2Design,
  // Add other templates as needed
  // template3: Template3Design,
  // etc...
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
