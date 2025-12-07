import cors from "cors";
import express from "express";
import router from "./routes/index.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notfound.middleware";

// Express app initialization
const app = express();

// Global middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", router);

// Error and not found middlewares
app.use(errorMiddleware);
app.use(notFoundMiddleware);

export default app;
