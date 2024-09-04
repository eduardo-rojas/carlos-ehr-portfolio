"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
} from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form-popover";
import { ModeToggle } from "@/components/mode-toggle";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const Navbar = () => {
  const { organization } = useOrganization();

  // SERVER SIDE logic
  // const { orgId } = auth();
  // const organization = await clerkClient.organizations.getOrganization({
  //   organizationId: orgId as string,
  // });

  const orgName = organization?.name;

  return (
    <nav className="dark:border-stroke-dark dark:bg-gray-dark dark:text-white fixed z-50 top-0 px-4  w-full h-14 border-b shadow-sm bg-white flex items-center">
      {/* MOBILE SIDEBAR */}
      <MobileSidebar />
      {/* DESKTOP SIDEBAR */}
      <div className="flex items-center justify-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>

        {/* <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            variant="secondary"
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
          >
            Crear
          </Button>
        </FormPopover>
        <FormPopover>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-sm block md:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover> */}
      </div>

      <div className="ml-auto flex items-center gap-x-2  ">
        <div className="justify-center  align-middle">
          <div className="  dark:bg-dark-2 border-r-2 border-r-black border-blue-500  pt-1 px-1 rounded-sm">
            <h1 className="dark:text-newBlue-1 mb-0.5 text-lg font-bold text-dark ">
              {orgName}
            </h1>
            <p className="dark:text-dark-6 text-xs text-muted-foreground">
              Carlos Eduardo Hoyos | Software Developer
            </p>
          </div>
        </div>
        <ModeToggle />
        {/* <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            // variables: {
            //   colorText: "#fff",
            // },
            variables: {
              colorText: "#ff2",
              colorPrimary: "#ff2",
              colorTextSecondary: "#ff2",
            },
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        /> */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
