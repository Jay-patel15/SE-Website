import { Router } from "express";
import { leadSchema } from "../validators/leadSchema.js";

export const leadsRouter = Router();

leadsRouter.post("/", async (request, response) => {
  const parsed = leadSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid lead payload", details: parsed.error.flatten() });
    return;
  }

  response.status(201).json({
    ok: true,
    message: "Lead route ready. Connect repositories/leadsRepository.ts to Supabase."
  });
});
