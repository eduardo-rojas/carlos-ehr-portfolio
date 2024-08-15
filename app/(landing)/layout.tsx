import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    //   storageKey="carlos-theme"
    // >
    <div className="h-full  dark:bg-[#1f1f1f]">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
    // </ThemeProvider>
  );
};

export default LandingLayout;
