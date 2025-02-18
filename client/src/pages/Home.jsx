import React, { useContext, useEffect } from "react";
import axiosInstance from "../api/axiosinstance";
import { PollContext } from "../context/pollcontext";

const Home = () => {
    const { currentPoll, setCurrentPoll } = useContext(PollContext);

    useEffect(() => {
        const fetchPoll = async () => {
            const responce = await axiosInstance.get("/");
            setCurrentPoll(responce.data);
            console.log(responce.data);
        };
        fetchPoll();
    }, []);

    return <div className="flex flex-col items-center">Homepage</div>;
};

export default Home;
