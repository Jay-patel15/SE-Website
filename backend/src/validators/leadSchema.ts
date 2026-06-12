import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional(),
  service: z.string().min(2),
  message: z.string().min(5)
});
