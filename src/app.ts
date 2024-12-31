import express, { Express } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { morganmiddleware } from "./middlewares/morgan";
import { errormiddleware } from "./middlewares/error";
import { notfoundmiddleware } from "./middlewares/notfound";
import router from "./routes/routes";
import { FRONTEND_URL } from "./config/config";

// Configurations
const app: Express = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(cookieParser());
app.use(helmet());
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true
    })
);
app.use(morganmiddleware);

// Routes
app.use("/api/v1", router);

// Error and 404 not found middleware
app.use(errormiddleware);
app.use("*", notfoundmiddleware);

export default app;
