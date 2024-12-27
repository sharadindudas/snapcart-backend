import app from "./app.js";
import { PORT, SERVER_URL } from "./config/config.js";
import { connectMongoDB } from "./utils/mongodb.js";
import { connectCloudinary } from "./utils/cloudinary.js";

// Uncaught exception
process.on("uncaughtException", (err) => {
    console.error(err.message);
    console.error("Shutting down the server due to Uncaught exception error");
    process.exit(1);
});

// Connection to server
const server = app.listen(PORT, () => {
    console.log(`Server started at ${SERVER_URL}`);

    // Connection to database
    connectMongoDB();

    // Connection to cloudinary
    connectCloudinary();
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.error(err.message);
    console.error("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => process.exit(1));
});
