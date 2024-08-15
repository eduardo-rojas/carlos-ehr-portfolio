"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { createDocument } from "@/actions/documents/create-document";
import Spline from "@splinetool/react-spline";
import { DocumentList } from "../../../_components/documents-list";

const DocumentsPage = () => {
  const { organization } = useOrganization();

  const { execute, fieldErrors } = useAction(createDocument, {
    onSuccess: (data) => {
      toast.success(`Document "${data.title}" created`);
      // formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCreate = () => {
    const promise = execute({ title: "Untitled", parentDocument: "" });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center  md:pt-11 space-y-4">
      {/* <Image
        className="dark:hidden"
        src="/empty.png"
        height="600"
        width="600"
        alt="Empty"
      /> */}
      {/* <Spline
        className="hidden dark:block"
        scene="https://prod.spline.design/6XZhd8DfzRxB0RZd/scene.splinecode"
      /> */}
      <div className="hidden dark:block w-full h-[350px]">
        <Spline scene="https://prod.spline.design/DCCzDMGisyF6CCrW/scene.splinecode" />
      </div>
      <div className=" dark:hidden w-full h-[350px]">
        <Spline scene="https://prod.spline.design/AaBYKDcX503IDoCB/scene.splinecode" />
      </div>
      {/* // <Spline
      //   className=" dark:hidden w-[600px] h-[600px]"
      //   scene="https://prod.spline.design/L5PKaTacQXESornk/scene.splinecode"
      // /> */}
      {/* <Image
        className="hidden dark:block"
        src="/empty-dark.webp"
        height="300"
        width="300"
        alt="Empty"
      /> */}
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
