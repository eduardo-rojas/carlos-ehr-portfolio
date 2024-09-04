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
        " z-[99999] bg-background  top-0 flex items-center w-full p-6 mb-1 y-0",
        scrolled && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
        <Button size="sm" variant="outline" asChild>
          <Link href="/sign-in">Login</Link>
        </Button>

        <Button className="dark:text-dark-2" size="sm" asChild>
          <Link href="/sign-up">SignUp</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
