"use client";
import { db } from "@/lib/db";
import { Document } from "@prisma/client";
// import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Cover } from "@/app/(platform)/(dashboard)/organization/[organizationId]/documents/[documentId]/_components/cover";
import { Toolbar } from "@/app/(platform)/(dashboard)/organization/[organizationId]/documents/[documentId]/_components/toolbar";
import { DocumentNavbar } from "@/app/(platform)/(dashboard)/organization/[organizationId]/documents/[documentId]/_components/document-navbar";
interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
    organizationId: string;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () =>
      dynamic(
        () =>
          import(
            "@/app/(platform)/(dashboard)/organization/[organizationId]/documents/[documentId]/_components/editor"
          ),
        { ssr: false },
      ),
    [],
  );
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  // const update = useMutation(api.documents.update);

  // const onChange = (content: string) => {
  //   update({
  //     id: params.documentId,
  //     content,
  //   });
  // };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-1 w-[80%]" />
            <Skeleton className="h-1 w-[40%]" />
            <Skeleton className="h-1 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }
  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      {/* md:max-w-3xl lg:max-w-4xl */}
      <div className=" w-full ml-10">
        <Toolbar preview initialData={document} />

        <Editor
          editable={false}
          onChange={() => {}}
          initialContent={document.content}
        />
      </div>
      {/* 
      <p>Document Id page</p>
      <p>Document id {params.documentId}</p>
      <p>Document OrgId {paraams.organizationId}</p> */}
      {/* <p className="text-bold">Document OrgId data: {documentData?.title}</p> */}
    </div>
  );
};

export default DocumentIdPage;
