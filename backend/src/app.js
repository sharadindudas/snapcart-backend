import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/route.js";
import { FRONTEND_URL } from "./config/config.js";
import { errormiddleware } from "./middlewares/error.js";
import { notfoundmiddleware } from "./middlewares/notfound.js";

// Configurations
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true
    })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1", router);

// Error and Not found middleware
app.use(errormiddleware);
app.use("*", notfoundmiddleware);

export default app;
