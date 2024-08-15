import { z } from "zod";
import { Document } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeleteDocument } from "./schema";

export type InputType = z.infer<typeof DeleteDocument>;
export type ReturnType = ActionState<InputType, Document>;
