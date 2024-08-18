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

  // const { data: documentData } = useQuery<Document[]>({
  //   queryKey: ["documents", organization?.id],
  //   queryFn: () => fetcher(`/api/documents/${organization?.id}`),
  // // });

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  if (!organization) {
    return redirect("/select-org");
  }

  const onRedirect = (documentId: string) => {
    router.push(`/organization/${organization.id}/documents/${documentId}`);
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

  // const [orderedDocs, setOrderedDocs] = useState(documentData);

  // useEffect(() => {
  //   setOrderedDocs(documentData);
  // }, [documentData]);

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
      <div className="dark:text-white  mx-8 space-y-2 mb-1 ">
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
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <DocumentItem label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              // side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        )}
      </div>
      {/* <div className="dark:text-white  mx-8 space-y-2 mb-1 ">
        <DocumentItem
          label="Search"
          icon={Search}
          isSearch
          onClick={search.onOpen}
        />
        {documentData?.map((document) => (
          <DocumentItem
            key={document.id}
            id={document.id}
            onClick={() => onRedirect(document.id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document.id}
          />
        ))}
      </div> */}
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
