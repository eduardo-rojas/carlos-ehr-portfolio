import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Hero from "./_components/hero";
import { Heroes } from "./_components/heroes";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
// Local font usage
// import localFont from "next/font/local";
// const headingFont = localFont({
//   src: "../../public/fonts/JxTabeDEMO-Regular.ttf",
// });

const textfont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "800", "900"],
});

const LandingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Hero />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
