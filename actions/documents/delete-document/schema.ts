import { z } from "zod";

export const DeleteDocument = z.object({
  id: z.string(),
});
