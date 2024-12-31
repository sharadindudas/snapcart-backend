import { createClient, type RedisClientType } from "redis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../config/config";
import { logger } from "./logger";

let redisClient: RedisClientType;

const connectRedis = async () => {
    redisClient = createClient({
        password: REDIS_PASSWORD,
        socket: {
            host: REDIS_HOST,
            port: REDIS_PORT
        }
    });
    redisClient.on("connect", () => logger.info("Redis is connected successfully"));
    redisClient.on("error", (err) => logger.error(err.message));
    redisClient.on("reconnecting", () => logger.info("Redis is reconnecting"));
    await redisClient.connect();
};

export { redisClient, connectRedis };
