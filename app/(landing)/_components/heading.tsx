"use client";

import { Button } from "@/components/ui/button";

export const Heading = () => {
  return (
    <div className="dark:bg-[#1f1f1f] max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Carlos Eduardo Hoyos{" "}
        <span className="underline">Software Developer</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        I develop Full Stack Web applications with the T3 stack: Next.js,
        TypeScript and Tailwind.
      </h3>
      <Button>Start your project!</Button>
    </div>
  );
};
