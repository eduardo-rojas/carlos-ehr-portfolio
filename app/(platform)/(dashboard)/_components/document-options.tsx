"use client";
import { deleteDocument } from "@/actions/documents/delete-document";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { useOrganization } from "@clerk/nextjs";
import { Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

interface DocumentItemOptionsProps {
  id: string;
}

export const DocumentItemOptions = ({ id }: DocumentItemOptionsProps) => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { execute: executeDeleteDoc } = useAction(deleteDocument, {
    onSuccess: (data) => {
      toast.success(`Document deleted. `);
      // closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    // event.stopPropagation();
    executeDeleteDoc({ id });
    // revalidatePath(`/organization/${organization}`);
    // redirect(`/organization/${organization}/documents`);
    router.push("/");
  };
  return (
    <DropdownMenuItem>
      <Button
        variant="ghost"
        onClick={onDelete}
        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
      >
        <Trash className="h-4 w-4 mr-2 " />
        Delete
      </Button>
    </DropdownMenuItem>
  );
};
