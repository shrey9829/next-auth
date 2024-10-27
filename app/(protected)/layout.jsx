import React from "react";
import NavBar from "./_components/navbar";

const ProtectedLayout = ({ children }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <NavBar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
