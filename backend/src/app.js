import express from "express";
import router from "./routes/route.js";
import { errormiddleware } from "./middlewares/error.js";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.use(errormiddleware);

export default app;
