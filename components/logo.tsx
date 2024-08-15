import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "../public/fonts/JxTabeDEMO-Regular.ttf",
});

export const Logo = () => {
  return (
    <Link className="hidden md:flex w-full items-center gap-x-2" href="/">
      <div
        className={
          "hover:opacity-75 transition items-center gap-x-2 hidden md:flex"
        }
      >
        <Image
          src="/logo.png"
          alt="Logo"
          height={50}
          width={50}
          className="dark:hidden"
        />
        {/*TODO: Change below logo - DARK MODE */}
        <Image
          src="/logo.png"
          alt="Logo"
          height={50}
          width={50}
          className="hidden dark:block"
        />
        <p
          className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}
        >
          carlos-ehr
        </p>
      </div>
    </Link>
  );
};
