import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { Document } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: { documentId: string } },
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const document = await db.document.findUnique({
      where: {
        id: params.documentId,
        orgId: orgId,
      },
    });

    console.log(document);

    return NextResponse.json(document);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
