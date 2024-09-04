"use client";
import { db } from "@/lib/db";
import { useOrganization, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect, useParams, useRouter } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "convex/react";
import { Document } from "@prisma/client";
import { TrashBox } from "./trash-box";
import { useEffect, useState } from "react";
import { DocumentItem } from "./document-item";
import { FileIcon, Search, Trash } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const search = useSearch();
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const { organization } = useOrganization();
  if (!organization?.id) {
    redirect("/select-org");
  }
  const orgId = organization?.id;

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
    orgId: orgId,
  });

  if (!organization) {
    return redirect("/select-org");
  }

  const onRedirect = (documentId: string) => {
    router.push(`/organization/${orgId}/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <div>
          <DocumentItem.Skeleton level={level} />
          {level === 0 && (
            <>
              <DocumentItem.Skeleton level={level} />
              <DocumentItem.Skeleton level={level} />
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden",
        )}
      >
        No pages inside
      </p>
      <div className="dark:text-white   w-fill  mx-1 space-y-2 mb-1 ">
        {level === 0 && (
          <DocumentItem
            label="Search"
            level={level}
            icon={Search}
            isSearch
            onClick={search.onOpen}
          />
        )}
        {documents.map((document) => (
          <div key={document._id}>
            <DocumentItem
              id={document._id}
              onClick={() => onRedirect(document._id)}
              label={document.title}
              icon={FileIcon}
              documentIcon={document.icon}
              active={params.documentId === document._id}
              level={level}
              onExpand={() => onExpand(document._id)}
              expanded={expanded[document._id]}
            />
            {expanded[document._id] && (
              <DocumentList parentDocumentId={document._id} level={level + 1} />
            )}
          </div>
        ))}
        {/* TRASHCAN */}
        {level === 0 && (
          <div className="">
            <Popover>
              <PopoverTrigger className="w-full mt-4 ">
                <DocumentItem label="Trash" icon={Trash} />
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-72 bg-slate-200 dark:bg-dark-2 text-dark-2 dark:text-slate-200"
                side="right"
                align="center"
              >
                <TrashBox />
              </PopoverContent>
            </Popover>
          </div>
        )}
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
