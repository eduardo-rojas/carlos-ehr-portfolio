"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { useSearch } from "@/hooks/use-search";
import { fetcher } from "@/lib/fetcher";
import { Document } from "@prisma/client";
import DocumentsPage from "@/app/(platform)/(dashboard)/organization/[organizationId]/documents/page";
import Link from "next/link";

export const SearchCommand = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { data: documentData } = useQuery<Document[]>({
    queryKey: ["documents", organization?.id],
    queryFn: () => fetcher(`/api/documents/${organization?.id}`),
  });

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) {
    return null;
  }

  const onSelect = (id: string) => {
    router.push(`/organization/${organization?.id}/documents`);
    onClose();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s documents...`} />
      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup heading="Documents">
          {documentData?.map((document) => (
            <Link
              href={`/organization/${document.orgId}/documents/${document.id}`}
            >
              <CommandItem
                key={document.id}
                value={`${document.id}-${document.title}`}
                title={document.title}
                onSelect={onSelect}
              >
                {document.icon ? (
                  <p className="mr-2 text-[18px]">{document.icon}</p>
                ) : (
                  <File className="mr-2 h-4 w-4" />
                )}

                <span>{document.title}</span>
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
