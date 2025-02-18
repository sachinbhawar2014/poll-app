import axios from "axios";
// import { configDotenv } from "dotenv";

// configDotenv();

const axiosInstance = axios.create({
    baseURL: "http://localhost:3600",
    withCredentials: true, // ✅ Including cookies in requests
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
