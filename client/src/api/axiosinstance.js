import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://poll-app-nies.onrender.com/",
    withCredentials: true, // Ensures cookies/session data is sent
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
