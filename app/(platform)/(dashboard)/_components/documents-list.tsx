"use client";
import { db } from "@/lib/db";
import { useOrganization, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect, useParams, useRouter } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { Document } from "@prisma/client";
import { useEffect, useState } from "react";
import { DocumentItem } from "./document-item";
import { FileIcon, Search } from "lucide-react";
import { useSearch } from "@/hooks/use-search";

export const DocumentList = () => {
  const search = useSearch();
  const params = useParams();
  const router = useRouter();
  const { organization } = useOrganization();

  const { data: documentData } = useQuery<Document[]>({
    queryKey: ["documents", organization?.id],
    queryFn: () => fetcher(`/api/documents/${organization?.id}`),
  });

  if (!organization) {
    return redirect("/select-org");
  }

  const onRedirect = (documentId: string) => {
    router.push(`/organization/${organization.id}/documents/${documentId}`);
  };

  // const [orderedDocs, setOrderedDocs] = useState(documentData);

  // useEffect(() => {
  //   setOrderedDocs(documentData);
  // }, [documentData]);

  return (
    <>
      <div className="dark:text-white  mx-8 space-y-2 mb-1 ">
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
