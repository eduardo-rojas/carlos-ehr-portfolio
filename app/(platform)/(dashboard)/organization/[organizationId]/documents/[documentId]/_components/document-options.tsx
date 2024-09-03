"use client";
import { deleteDocument } from "@/actions/documents/delete-document";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { useUser } from "@clerk/nextjs";
import { Document } from "@prisma/client";
import { MoreHorizontal, Trash, X } from "lucide-react";
import { toast } from "sonner";

interface DocumentOptionsProps {
  data: Document;
}

export const DocumentOptions = ({ data }: DocumentOptionsProps) => {
  const { user } = useUser();
  const { execute, isLoading } = useAction(deleteDocument, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id: data.id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-3 pb-3 z-999 dark:bg-dark-4 dark:text-dark-6"
        side="bottom"
        align="end"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Document actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete this document
        </Button>
        {/* <Separator />
        <div>Last edited by: {data.userId}</div> */}

        <DropdownMenuSeparator />
        <div className="w-full h-auto p-2 px-5 justify-start font-normal text-sm">
          Last edited by: {user?.fullName}
        </div>
      </PopoverContent>
    </Popover>
  );
};
