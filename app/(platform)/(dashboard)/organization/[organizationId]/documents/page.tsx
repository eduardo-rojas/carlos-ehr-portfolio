"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import Spline from "@splinetool/react-spline";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect, useRouter } from "next/navigation";

const DocumentsPage = () => {
  const { organization } = useOrganization();
  const router = useRouter();

  if (!organization?.id) {
    redirect("/select-org");
  }

  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled", orgId: organization.id }).then(
      (documentId) =>
        router.push(
          `/organization/${organization.id}/documents/${documentId} `,
        ),
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="dark:bg-[#020D1A] max-h-screen flex flex-col items-center justify-center  md:pt-11 space-y-4">
      <div className="hidden dark:block w-full h-[350px]">
        <Spline scene="https://prod.spline.design/DCCzDMGisyF6CCrW/scene.splinecode" />
      </div>
      <div className=" dark:hidden w-full h-[350px]">
        <Spline scene="https://prod.spline.design/AaBYKDcX503IDoCB/scene.splinecode" />
      </div>

      <h2 className="text-lg font-medium">
        Welcome to {organization?.name}&apos;s documents
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>

      {/* <DocumentList /> */}
      {/* {documentData} */}
      {/* <div>
        {documentData?.map((document) => (
          <p key={document.id}>{document.title}</p>
        ))}
      </div> */}
      {/* <DocumentList /> */}
    </div>
  );
};

export default DocumentsPage;
