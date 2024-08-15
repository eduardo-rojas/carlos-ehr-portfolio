"use server";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { DeleteDocument } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { createAuditLog } from "@/lib/create-audit-log";
import { redirect } from "next/navigation";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;
  //@ts-ignore
  let document;

  try {
    document = await db.document.delete({
      where: {
        id,
      },
    });

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.DELETE,
    // });
  } catch (error) {
    return {
      error: "Failed to delete document.",
    };
  }
  console.log(document);
  revalidatePath(`/organization/${orgId}/documents`);
  redirect(`/organization/${orgId}/documents`);
};

export const deleteDocument = createSafeAction(DeleteDocument, handler);
