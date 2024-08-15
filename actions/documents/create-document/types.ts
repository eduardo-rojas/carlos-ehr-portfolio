import { z } from "zod";
import { Document } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateDocument } from "./schema";

export type InputType = z.infer<typeof CreateDocument>;
export type ReturnType = ActionState<InputType, Document>;
