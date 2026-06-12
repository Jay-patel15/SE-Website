import cors from "cors";
import express from "express";
import helmet from "helmet";
import { leadsRouter } from "./routes/leads.js";

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_request, response) => {
  response.json({ ok: true, service: "siddhi-electricals-backend" });
});

app.use("/api/leads", leadsRouter);

app.listen(port, () => {
  console.log(`Siddhi Electricals backend listening on ${port}`);
});
