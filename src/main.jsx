import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { LoadScript } from "@react-google-maps/api";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
          <Toaster />
        </Provider>
      </BrowserRouter>
    </NextUIProvider>
  </StrictMode>
);
