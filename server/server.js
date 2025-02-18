import server from "./index.js";
import { configDotenv } from "dotenv";
import connectToDB from "./src/config/mongodb.config.js";

configDotenv();
const PORT = process.env.PORT;

server.listen(PORT, () => {
    connectToDB();
});
