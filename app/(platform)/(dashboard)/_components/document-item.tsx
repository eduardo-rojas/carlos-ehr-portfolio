"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, useUser } from "@clerk/nextjs";
import { LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { deleteDocument } from "@/actions/documents/delete-document";
import { toast } from "sonner";
import { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { DocumentItemOptions } from "./document-options";

interface ItemProps {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  isSearch?: boolean;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

export const DocumentItem = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
}: ItemProps) => {
  const { user } = useUser();

  // const { execute: executeDeleteDoc } = useAction(deleteDocument, {
  //   onSuccess: (data) => {
  //     toast.success(`List "${data.title} deleted. `);
  //     // closeRef.current?.click();
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });

  // const onDelete = (id: string) => {
  //   executeDeleteDoc({ id });
  // };
  return (
    <div
      onClick={onClick}
      role="button"
      className="group min-h-[27px] text-sm py-1 pr-3 hover:bg-primary/5 flex items-center text-muted-foreground  dark:text-white  w-full font-normal justify-start pl-10 mb-1"
    >
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <div>
          <Icon className="shrink-0 h-[15px] mr-1 text-muted-foreground" />
        </div>
      )}

      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>k
        </kbd>
      )}

      {!!id && (
        <div
          role="button"
          onClick={() => {}}
          className="w-7 opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
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
              <DocumentItemOptions id={id} />

              <DropdownMenuSeparator />
              <div>Last edited by: {user?.fullName}</div>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Plus className="h-4 w-4 text-muted-foreground" /> */}
        </div>
      )}
    </div>
  );
};
