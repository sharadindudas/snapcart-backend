import app from "./app";
import { PORT, SERVER_URL } from "./config/config";
import { connectMongoDB } from "./utils/mongodb";
import { connectRedis } from "./utils/redis";
import { connectCloudinary } from "./utils/cloudinary";
import { logger } from "./utils/logger";

// Connection to server
app.listen(PORT, () => {
    logger.info(`Server started at ${SERVER_URL}`);

    // Connection to databases
    connectMongoDB();
    connectRedis();

    // Connection to cloudinary
    connectCloudinary();
});
