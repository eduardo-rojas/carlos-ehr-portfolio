import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { Document } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: { orgId: string } },
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const documents = await db.document.findMany({
      where: {
        orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(documents);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
