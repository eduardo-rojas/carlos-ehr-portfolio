"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Activity,
  CreditCard,
  FileText,
  Layout,
  LayoutDashboardIcon,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentList } from "./documents-list";
import { DocumentItem } from "./document-item";
import { useSearch } from "@/hooks/use-search";
import { MeetingsList } from "./meetings-list";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isExpanded,
  isActive,
  organization,
  onExpand,
}: NavItemProps) => {
  const search = useSearch();
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: "Dashboard",
      icon: <LayoutDashboardIcon className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/dashboard`,
    },
    {
      label: "Documents",
      icon: <FileText className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/documents`,
    },
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Meetings",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/meeting`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 dark:text-white  text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700",
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medioum text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {/* <DocumentItem
          label="Search"
          icon={Search}
          isSearch
          onClick={search.onOpen}
        /> */}
        {/* <DocumentItem
          onClick={() => {}}
          label="Document Item"
          icon={PlusCircle}
        /> */}
        {routes.map((route) => (
          <div key={route.href}>
            <Button
              key={route.href}
              size="sm"
              onClick={() => onClick(route.href)}
              className={cn(
                "w-full text-sm font-medium dark:text-white  justify-start pl-10 mb-5",
                pathname === route.href && "bg-sky-500/10 text-sky-700",
              )}
              variant="ghost"
            >
              {route.icon}
              {route.label}
            </Button>
            {route.label === "Documents" ? <DocumentList /> : ""}
            {route.label === "Meetings" ? <MeetingsList /> : ""}
            {/* {route.label === "Documents"
              ? documents?.map((document) => (
                  <p key={document._id}>{document.title}</p>
                ))
              : ""} */}
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
