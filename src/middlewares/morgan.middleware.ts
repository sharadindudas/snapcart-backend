import morgan, { StreamOptions } from "morgan";
import { ENV } from "../config/config";
import { logger } from "../utils/logger";

const stream: StreamOptions = {
    write: (message) => logger.http(message)
};

const skip = () => {
    const env = ENV || "development";
    return env !== "development";
};

export const morganmiddleware = morgan(":method :url :status :res[content-length] - :response-time ms", { stream, skip });
