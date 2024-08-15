"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "dark:bg-[rgb(31,31,31)] z-50 bg-background fixed top-0 flex items-center w-full p-6 mb-4y0",
        scrolled && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
        <Button size="sm" variant="outline" asChild>
          <Link href="/sign-in">Login</Link>
        </Button>

        <Button size="sm" asChild>
          <Link href="/sign-up">SignUp</Link>
        </Button>
      </div>
    </div>
    // <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
    //   <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between ">
    //     <Logo />
    //     <div className="space-x-4 gap-3 md:block md:w-auto flex items-center justify-end w-full">
    //       <Button size="sm" variant="outline" asChild>
    //         <Link href="/sign-in">Login</Link>
    //       </Button>
    //       <Button size="sm" asChild>
    //         <Link href="/sign-up">SignUp</Link>
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;
