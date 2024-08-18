"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, useOrganization, useUser } from "@clerk/nextjs";
import {
  ChevronDownIcon,
  ChevronRight,
  ChevronUpIcon,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";

import { toast } from "sonner";
import { MouseEvent } from "react";
// import { DocumentItemOptions } from "./document-options";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  isSearch?: boolean;
  label: string;
  level?: number;
  onClick?: () => void;
  icon: LucideIcon;
  onExpand?: () => void;
  expanded?: boolean;
}

export const DocumentItem = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const router = useRouter();
  const create = useMutation(api.documents.create);

  const { user } = useUser();
  const { organization } = useOrganization();

  const archive = useMutation(api.documents.archive);

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() =>
      router.push(`/organization/${organization?.id}/documents`),
    );

    toast.promise(promise, {
      loading: "Moving to archive...",
      success: "Note moved to trash",
      error: "Failed to archive note.",
    });
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(
        //   `/organization/${organization?.id}/documents/${documentId}`,
        // );
      },
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  const ChevronIcon = expanded ? ChevronDownIcon : ChevronRight;
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 hover:bg-primary/5 flex items-center text-muted-foreground  dark:text-white  w-full font-normal justify-start pl-10 mb-1",
        active && "bg-primary/5 text-primary",
      )}
    >
      {/* CHEVRON ICON */}
      {!!id && (
        <div
          role="button"
          className="h-ull rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
          //@ts-ignore
          onClick={handleExpand}
        >
          <ChevronIcon className="h-5 w-5 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {/* ICON */}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <div>
          <Icon className="shrink-0 h-[15px] w-[15px] mr-1 text-muted-foreground" />
        </div>
      )}
      {/* SEARCH */}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘ + k</span>
        </kbd>
      )}
      {/* MORE: ... */}
      {!!id && (
        <div
          role="button"
          onClick={() => {}}
          className="ml-auto flex items-center gap-x-2"
          // className="w-7 opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
        >
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-5 w-7 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              {/* DELETE Document */}
              {/* <DocumentItemOptions id={id} /> */}
              <DropdownMenuItem
                //@ts-ignore
                onClick={onArchive}
              >
                <Trash className="h-4 w-4 mr-2 " />
                Delete
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <div>Last edited by: {user?.fullName}</div>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Plus className="h-4 w-4 text-muted-foreground" /> */}
        </div>
      )}
      {/* PLUS: ... */}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <div
            role="button"
            //@ts-ignore
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

DocumentItem.Skeleton = function DocumentItemSkeleton({
  level,
}: {
  level?: number;
}) {
  return (
    <div>
      <Skeleton className="h-4 w-4 " />
      <Skeleton className="h-4 w-[30%] " />
    </div>
  );
};
