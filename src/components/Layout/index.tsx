import React from "react";
import Navbar from "@/components/Navbar";

const Layout: React.FC<React.ReactNode> = ({ children }) => (
  <div className="w-full">
    <Navbar />
    <div className="md:container md:mx-auto px-8">{children}</div>
  </div>
);

export default Layout;
