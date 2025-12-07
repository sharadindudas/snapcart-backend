import app from "./app";
import { PORT, SERVER_URL } from "./config";
import { connectMongoDB } from "./utils/mongodb";

// Uncaught exception
process.on("uncaughtException", (err) => {
    if (err instanceof Error) {
        console.error(err.message);
        console.error(`Shutting down the server due to uncaught exception`);
    }
    process.exit(1);
});

// Connection to database
connectMongoDB();

// Connection to server
const server = app.listen(PORT, () => {
    console.log(`Server is running on ${SERVER_URL}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    if (err instanceof Error) {
        console.error(err.message);
        console.error(`Shutting down the server due to unhandled promise rejection`);
    }

    server.close(() => {
        process.exit(1);
    });
});
