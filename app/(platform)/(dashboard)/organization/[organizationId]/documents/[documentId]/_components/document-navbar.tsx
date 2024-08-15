import { Document } from "@prisma/client";
import DocumentTitleForm from "./document-title-form";
import { Banner } from "./banner";
import { DocumentOptions } from "./document-options";

interface DocumentNavbarProps {
  data: Document;
}

export const DocumentNavbar = async ({ data }: DocumentNavbarProps) => {
  return (
    <>
      <nav className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
        <DocumentTitleForm data={data} />
        <div className="">
          <DocumentOptions data={data} />
        </div>
      </nav>

      {/* <Banner documentId={data.id} /> */}
    </>
  );
};
