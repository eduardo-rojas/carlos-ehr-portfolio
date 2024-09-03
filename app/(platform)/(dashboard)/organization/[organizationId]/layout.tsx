import { OrgControl } from "./_components/org-control";
import { startCase } from "lodash";
import { auth } from "@clerk/nextjs/server";
import StreamVideoProvider from "@/components/providers/stream-client-provider";
export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization"),
  };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full dark:bg-[#020D1A]">
        <StreamVideoProvider>
          <OrgControl />
          {children}
        </StreamVideoProvider>
      </div>
    </>
  );
};

export default OrganizationIdLayout;
