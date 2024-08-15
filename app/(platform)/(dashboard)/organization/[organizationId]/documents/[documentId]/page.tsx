"use client";
import { db } from "@/lib/db";
import { DocumentNavbar } from "./_components/document-navbar";
import { Document } from "@prisma/client";
import { Toolbar } from "./_components/toolbar";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

interface DocumentIdPageProps {
  params: {
    documentId: string;
    organizationId: string;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  console.log("My doc ID ===> ", params.documentId);

  // const { data: existingDocument } = useQuery<Document[]>({
  //   queryKey: ["document", params?.documentId],
  //   queryFn: () => fetcher(`/api/getdocument/${params?.documentId}`),
  // });

  const { data: documentData } = useQuery<Document>({
    queryKey: ["documentById", params.organizationId],
    queryFn: () =>
      fetcher(
        `/api/documents/single-doc/${params.organizationId}/${params.documentId}`,
      ),
  });

  // const existingDocument = await db.document.findUnique({
  //   where: {
  //     id: params.documentId,
  //     orgId: params.organizationId,
  //   },
  // });
  console.log("My DOCUMENT >>>> ", documentData);

  if (!documentData) {
    <div>Document not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar initialData={documentData} />
      </div>
      {/* 
      <p>Document Id page</p>
      <p>Document id {params.documentId}</p>
      <p>Document OrgId {params.organizationId}</p> */}
      {/* <p className="text-bold">Document OrgId data: {documentData?.title}</p> */}
    </div>
  );
};

export default DocumentIdPage;
