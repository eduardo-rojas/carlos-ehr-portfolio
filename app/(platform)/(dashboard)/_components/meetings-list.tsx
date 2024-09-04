"use client";

import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import { FileIcon, Search, Trash, UserRound } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MeetingsListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export const MeetingsList = ({
  parentDocumentId,
  level = 0,
}: MeetingsListProps) => {
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
      <div className="text-black dark:text-white  dark:bg-gray-dark mx-8 space-y-2 mb-1">
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
                <UserRound className="w-4 h-4" />

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
