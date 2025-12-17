import app from "./app";
import { PORT, SERVER_URL } from "./config";
import { connectMongoDB } from "./utils/mongodb";
import { connectRedis } from "./utils/redis";

// Uncaught exception
process.on("uncaughtException", (error) => {
    console.error("❌ UNCAUGHT EXCEPTION:", error.message);
    console.error("Shutting down the server due to uncaught exception");
    process.exit(1);
});

(async () => {
    try {
        // Connection to database
        await connectMongoDB();
        await connectRedis();

        // Connection to server
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on ${SERVER_URL}`);
        });

        // Unhandled promise rejection
        process.on("unhandledRejection", (error) => {
            if (error instanceof Error) {
                console.error("❌ UNHANDLED REJECTION:", error.message);
                console.error(`Shutting down the server due to unhandled promise rejection`);
            }

            server.close(() => {
                process.exit(1);
            });
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
})();
