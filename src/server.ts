import app from "./app";
import { PORT, SERVER_URL } from "./config/config";
import { connectCloudinary } from "./utils/cloudinary";
import { logger } from "./utils/logger";
import { connectMongoDB } from "./utils/mongodb";
import { connectRedis } from "./utils/redis";

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    logger.error(err.message);
    logger.error("Shutting down the server due to uncaught exception");
    process.exit(1);
});

// Connection to server
const server = app.listen(PORT, () => {
    logger.info(`Server started at ${SERVER_URL}`);

    // Connection to database
    connectMongoDB();
    connectRedis();

    // Connection to cloudinary
    connectCloudinary();
});

// Handling unhandled promise rejection
process.on("unhandledRejection", (err: Error) => {
    logger.error(err.message);
    logger.error("Shutting down the server due to unhandled promise rejection");

    server.close(() => process.exit(1));
});
