"use client";
import { Document } from "@prisma/client";
import { Banner } from "./banner";
import { DocumentOptions } from "./document-options";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { indexOf } from "lodash";
import { MenuIcon, MoreHorizontalIcon, Trash } from "lucide-react";
import { DocumentTitle } from "./document-title";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useOrganization, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Publish } from "./publish";
// interface DocumentNavbarProps {
//   isCollapsed: boolean;
//   onResetWidth: () => void;
// }

export const DocumentNavbar = () => {
  const { organization } = useOrganization();
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  const onArchive = () => {
    const promise = archive({ id: params.documentId as Id<"documents"> });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash",
      error: "Failed to archive note.",
    });

    router.push("/organization/${organization._id}/documents");
  };

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 flex items-center ">
        <DocumentTitle.Skeleton />
        <div className="flex items-center justify-between w-full">
          <DocumentTitle.Skeleton />
          <DocumentTitle.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }
  return (
    <>
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 flex items-center gap-x-4">
        {/* <MenuIcon
          role="button"
          // onClick={onResetWidth}
          className="h-6 w-6 text-muted-foreground"
        /> */}
        <div className="flex items-center justify-between w-full">
          <DocumentTitle initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="bg-white dark:bg-[#1f1f1f] hover:bg-gray-100 dark:hover:bg-slate-500">
                <MoreHorizontalIcon className="h-4 w-4 text-slate-600 dark:text-slate-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 "
              align="end"
              alignOffset={8}
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}

      {/* <nav className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
        <DocumentTitleForm />
        <div className="">
          <DocumentOptions />
        </div>
      </nav> */}

      {/* <Banner documentId={data.id} /> */}
    </>
  );
};
