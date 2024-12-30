import express, { Express } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { FRONTEND_URL } from "./config/config";
import { notfoundmiddleware } from "./middlewares/notfound.middleware";
import { errormiddleware } from "./middlewares/error.middleware";
import { morganmiddleware } from "./middlewares/morgan.middleware";
import router from "./routes/route";

// Configurations
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true
    })
);
app.use(morganmiddleware);

// Routes
app.use("/api/v1", router);

// Error and not found middlewares
app.use(errormiddleware);
app.use("*", notfoundmiddleware);

export default app;
