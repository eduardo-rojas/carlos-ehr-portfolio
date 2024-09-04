import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="carlos-theme"
    >
      <div className="h-full  dark:bg-[#020D1A]  dark:text-dark-6">
        <Navbar />
        <main className="min-h-fit ">{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default LandingLayout;
