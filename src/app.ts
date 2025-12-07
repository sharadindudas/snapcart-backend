import cors from "cors";
import express from "express";
import router from "./routes/index.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notfound.middleware";
import { FRONTEND_URL } from "./config";

// Initialization of express application
const app = express();

// Global middlewares
app.use(express.json({ limit: "10mb" }));
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
    })
);

// Routes
app.use("/api/v1", router);

// Error and not found middlewares
app.use(errorMiddleware);
app.use(notFoundMiddleware);

export default app;
