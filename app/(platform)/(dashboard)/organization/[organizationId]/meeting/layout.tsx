import { Inter } from "next/font/google";
import { MeetingNavbar } from "./_components/meeting-navbar";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.className} flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 `}
    >
      <MeetingNavbar />
      <div className="w-full">
        {children}
        <Toaster />
      </div>
    </div>
  );
}
