import { SearchCommand } from "@/components/ui/search-command";
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
      <div className="dark:text-white  w-full h-full dark:bg-[#1f1f1f]">
        <Navbar />
        <SearchCommand />
        {children}
      </div>
    </ThemeProvider>
  );
};
export default DashboardLayout;
