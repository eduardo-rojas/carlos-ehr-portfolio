import { SearchCommand } from "@/app/(platform)/(dashboard)/organization/[organizationId]/documents/[documentId]/_components/search-command";
import Navbar from "./_components/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="carlos-theme"
    >
      <div className=" w-full min-h-full  dark:border-stroke-dark dark:bg-gray-dark dark:text-dark-6">
        <Navbar />
        <SearchCommand />
        {children}
      </div>
    </ThemeProvider>
  );
};
export default DashboardLayout;
