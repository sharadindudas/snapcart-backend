import Redis from "ioredis";
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "../config";

let redis: Redis | null = null;

export const connectRedis = async (): Promise<Redis> => {
    try {
        if (!redis) {
            redis = new Redis({
                host: REDIS_HOST || "localhost",
                port: Number(REDIS_PORT) || 6379,
                password: REDIS_PASSWORD || undefined,
                maxRetriesPerRequest: null,
                enableReadyCheck: false,
                retryStrategy: (times) => Math.min(times * 1000, 3000)
            });

            redis.on("connect", () => {
                console.log("✅ Redis is connected successfully");
            });

            redis.on("error", (err) => {
                console.error("❌ Redis connection error:", err.message);
            });
        }

        // Ensure Redis is actually reachable
        await redis.ping();

        return redis;
    } catch (err) {
        if (err instanceof Error) {
            console.error("❌ Redis connection failed:", err.message);
        }
        process.exit(1);
    }
};

export const redisInstance = (): Redis => {
    if (!redis) {
        throw new Error("Redis not initialized. Call connectRedis() first.");
    }
    return redis;
};
