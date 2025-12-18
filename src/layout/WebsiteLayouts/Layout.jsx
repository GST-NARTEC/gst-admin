import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppWidget from "../../components/Website/WhatsAppWidget";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

export default Layout;
