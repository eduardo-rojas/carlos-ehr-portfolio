"use client";
import { db } from "@/lib/db";
import { useOrganization, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "convex/react";
import { Document } from "@prisma/client";
import { useEffect, useState } from "react";
import { FileIcon, Search, Trash } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { TrashBox } from "./trash-box";
import Image from "next/image";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export const MeetingsList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const search = useSearch();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const meetingSidebarLinks = [
    {
      label: "Upcoming",
      route: `/organization/${params.organizationId}/meeting/upcoming`,
      imgUrl: "/icons/upcoming.svg",
    },
    {
      label: "Previous",
      route: `/organization/${params.organizationId}/meeting/previous`,
      imgUrl: "/icons/previous.svg",
    },
    {
      label: "Recordings",
      route: `/organization/${params.organizationId}/meeting/recordings`,
      imgUrl: "/icons/Video.svg",
    },
    {
      label: "Personal Room",
      route: `/organization/${params.organizationId}/meeting/personal-room`,
      imgUrl: "/icons/add-personal.svg",
    },
  ];
  return (
    <>
      <div className="text-black dark:text-white mx-8 space-y-2 mb-1">
        {meetingSidebarLinks.map((link) => {
          {
            const isActive =
              pathname === link.route || pathname.startsWith(link.route);
            return (
              <Link
                // label={link.label}
                href={link.route}
                key={link.label}
                className={cn(
                  "flex gap-4 items-center p-4 rounded-l justify-start",
                  { "bg-newBlue-1": isActive },
                )}
              >
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p>{link.label}</p>
              </Link>
            );
          }
        })}
      </div>
    </>
  );
};

// BoardList.Skeleton = function SkeletonBoardList() {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//       <Skeleton className="aspect-video h-full w-full p-2" />
//     </div>
//   );
// };
