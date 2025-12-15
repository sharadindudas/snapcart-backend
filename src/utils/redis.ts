import Redis from "ioredis";
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "../config";

export const redis = new Redis({
    host: REDIS_HOST || "localhost",
    port: REDIS_PORT || 6379,
    password: REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy: (times) => {
        const delay = Math.min(times * 1000, 3000);
        return delay;
    },
    lazyConnect: false
});

redis.on("connect", () => {
    console.log("✅ Redis is connected successfully");
});

redis.on("error", (err) => {
    console.error("❌ Redis connection error:", err.message);
});

redis.on("reconnecting", () => {
    console.log("🔄 Redis reconnecting...");
});

process.on("SIGINT", async () => {
    await redis.quit();
    console.log("Redis connection closed");
    process.exit(0);
});

process.on("SIGTERM", async () => {
    await redis.quit();
    console.log("Redis connection closed");
    process.exit(0);
});
