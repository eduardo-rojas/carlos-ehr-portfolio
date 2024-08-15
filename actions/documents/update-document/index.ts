"use server";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateDocument } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id } = data;

  // const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
  //   image.split("|");

  // console.log({
  //   imageId,
  //   imageThumbUrl,
  //   imageFullUrl,
  //   imageLinkHTML,
  //   imageUserName,
  // });

  if (!title) {
    return {
      error: "Missing fields. Failed to create document.",
    };
  }

  let document;

  try {
    document = await db.document.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });

    // TODO: include log --> update document
    // await createAuditLog({
    //   entityTitle: board.title,
    //   entityId: board.id,
    //   entityType: ENTITY_TYPE.BOARD,
    //   action: ACTION.CREATE,
    // });
  } catch (error) {
    return {
      error: "Failed to update document.",
    };
  }
  revalidatePath(`/organization/${orgId}/documents/${id}`);
  return { data: document };
};

export const updateDocument = createSafeAction(UpdateDocument, handler);
