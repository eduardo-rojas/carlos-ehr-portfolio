"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

const OrganizationDocumentsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <>
      <div className="w-full h-full flex dark:bg-[#1f1f1f] ">
        <main className="flex-1 h-full overflow-y-auto">{children}</main>
      </div>
    </>
  );
};

export default OrganizationDocumentsLayout;
