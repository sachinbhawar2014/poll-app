import React, { useContext, useEffect } from "react";
// import axiosInstance from "../api/axiosinstance";
import { PollContext } from "../context/PollContext";
import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();

const url = process.env.REACT_APP_API_URL;
const Home = () => {
    const { currentPoll, setCurrentPoll } = useContext(PollContext);

    useEffect(() => {
        const fetchPoll = async () => {
            const responce = await axios.get(url);
            setCurrentPoll(responce.data);
            console.log(responce.data);
        };
        fetchPoll();
    }, []);

    return <div className="flex flex-col items-center">Homepage</div>;
};

export default Home;
