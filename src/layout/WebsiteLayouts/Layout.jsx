import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="max-w-7xl mx-auto ">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
