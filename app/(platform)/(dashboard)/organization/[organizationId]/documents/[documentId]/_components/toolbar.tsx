"use client";

import { updateDocument } from "@/actions/documents/update-document";
import { IconPicker } from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Document } from "@prisma/client";
import { ImageIcon, Smile, X } from "lucide-react";
import React, { useState, useRef, ElementRef } from "react";
import { toast } from "sonner";
import TextAreaAutosize from "react-textarea-autosize";
import { FormInput } from "@/components/form/form-input";
import { useCoverImage } from "@/hooks/use-cover-image";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  // const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const removeIcon = useMutation(api.documents.removeIcon);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title || "Untitled");

  const update = useMutation(api.documents.update);

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({ id: initialData._id, icon });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  // const coverImage = useCoverImage();

  // const { execute } = useAction(updateDocument, {
  //   onSuccess: (initialData) => {
  //     toast.success(`Document ${initialData?.title} updated.`);
  //     //   formRef.current?.reset();
  //     setTitle(initialData.title);
  //     disableEditing();
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });

  // const enableEditing = () => {
  //   if (preview) return;
  //   setIsEditing(true);
  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //     inputRef.current?.select();
  //   });
  // };

  // const disableEditing = () => {
  //   setIsEditing(false);
  // };

  // const onSubmit = (formData: FormData) => {
  //   const title = formData.get("title") as string;
  //   execute({ title, id: initialData?.id || "" });
  // };

  // const onBlur = () => {
  //   formRef.current?.requestSubmit();
  // };

  // const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     disableEditing();
  //   }
  // };

  // const onSubmit = (formData: FormData) => {
  //   // const title = formData.get("title") as string;
  //   // const listId = formData.get("listId") as string;
  //   // const boardId = params.boardId as string;
  //   // execute({ title, listId, boardId });
  // };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
            <Button
              onClick={onRemoveIcon}
              className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
              variant="outline"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </IconPicker>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-100 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-mtued-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs "
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        // <TextAreaAutosize
        //   onClick={enableEditing}
        //   className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        //   ref={inputRef}
        //   onBlur={disableEditing}
        //   onKeyDown={onKeyDown}
        //   value={initialData?.title}
        //   onChange={(e) => onInput(e.target.value)}
        // />
        <TextAreaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] "
        >
          {initialData?.title}
        </div>
      )}
    </div>
  );
};
