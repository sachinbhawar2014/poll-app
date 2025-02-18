import axios from "axios";
import { configDotenv } from "dotenv";

configDotenv();

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // ✅ Including cookies in requests
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
