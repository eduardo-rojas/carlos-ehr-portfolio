import { z } from "zod";
import { Document } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateDocument } from "./schema";

export type InputType = z.infer<typeof UpdateDocument>;
export type ReturnType = ActionState<InputType, Document>;
