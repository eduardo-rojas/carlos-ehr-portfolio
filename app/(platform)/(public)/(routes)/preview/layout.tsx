import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#020D1A] dark:text-dark-6">{children}</div>
  );
};

export default PublicLayout;
