import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "./i18n/config";
import { HelmetProvider } from "react-helmet-async";
// Initialize language direction
const initialLanguage = store.getState().language?.language || "en";
document.documentElement.dir = initialLanguage === "ar" ? "rtl" : "ltr";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Provider store={store}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
          <Toaster />
        </Provider>
      </BrowserRouter>
    </NextUIProvider>
  </StrictMode>
);
