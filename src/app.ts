import cors from "cors";
import express from "express";
import router from "./routes/index.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

export default app;
