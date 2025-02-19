import React, { useContext, useEffect } from "react";
import axiosInstance from "../api/axiosinstance";
import { PollContext } from "../context/PollContext";

const Home = () => {
    const { currentPoll, setCurrentPoll } = useContext(PollContext);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const result = await axiosInstance.get("/");
                setCurrentPoll(result.data);
                console.log(result.data);
            } catch (error) {
                console.error("Error fetching poll data:", error);
            }
        };
        fetchPoll();
    }, []);

    return <div className="flex flex-col items-center">Homepage</div>;
};

export default Home;
