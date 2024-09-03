import { auth } from "@clerk/nextjs/server";
import { DocumentNavbar } from "./_components/document-navbar";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

// export async function generateMetadata({
//   params,
// }: {
//   params: { documentId: string };
// }) {
//   const { orgId } = auth();

//   if (!orgId) {
//     return {
//       title: "document",
//     };
//   }

//   const document = await db.document.findUnique({
//     where: {
//       id: params.documentId,
//       orgId,
//     },
//   });

//   return {
//     title:
//       `${document?.title} | Carlos-EHR | Software Developer ` || "document",
//   };
// }

const DocumentIdLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const { orgId } = auth();

  // if (!orgId) {
  //   return {
  //     title: "document",
  //   };
  // }

  // const document = await db.document.findUnique({
  //   where: {
  //     id: params.documentId,
  //     orgId,
  //   },
  // });

  // if (!document) {
  //   notFound();
  // }

  return (
    <div className="w-full h-full dark:bg-[#020D1A]">
      <DocumentNavbar />
      <main className="pt-3 w-full h-full">{children}</main>
    </div>
  );
};

export default DocumentIdLayout;
