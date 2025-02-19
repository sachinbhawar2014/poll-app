import axios from "axios";
// import { configDotenv } from "dotenv";

// configDotenv();

const axiosInstance = axios.create({
    baseURL: "https://poll-app-7tos.onrender.com",
    withCredentials: true, // ✅ Including cookies in requests
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
