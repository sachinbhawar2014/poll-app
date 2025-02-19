import React, { useContext, useEffect } from "react";
import axiosInstance from "../api/axiosinstance";
import { PollContext } from "../context/PollContext";

const Home = () => {
    const { currentPoll, setCurrentPoll } = useContext(PollContext);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await axiosInstance.get("/");
                console.log("Fetched Data:", response.data);
                setCurrentPoll(response.data);
            } catch (error) {
                if (error.response) {
                    console.error("Server responded with error:", error.response.data);
                    console.error("Status Code:", error.response.status);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                } else {
                    console.error("Error setting up request:", error.message);
                }
            }
        };

        fetchPoll();
    }, []);

    return <div className="flex flex-col items-center">Homepage</div>;
};

export default Home;
