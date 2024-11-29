import React from "react";
import { Routes, Route } from "react-router-dom";
import Template1Design from "../../pages/Website/Templates/Template1Design";

const templateComponents = {
  template1: Template1Design,
  // Add other templates as needed
  // template2: Template2Design,
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
