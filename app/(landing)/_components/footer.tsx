import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 h-full  z-50 dark:bg-[#020D1A]">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
    // <div className=" bottom-0 w-full p-4 border-t bg-slate-100">
    //   <div className="md:max-w-screen-2xl mx-auto flex tiems-center w-full justify-end">
    //     <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
    //       <Button size="sm" variant="ghost">
    //         Full stack web development
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Footer;
