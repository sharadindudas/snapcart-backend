import app from "./app";
import { PORT, SERVER_URL } from "./config";
import { connectMongoDB } from "./utils/mongodb";

connectMongoDB();
app.listen(PORT, () => {
    console.log(`Server is running on ${SERVER_URL}`);
});
