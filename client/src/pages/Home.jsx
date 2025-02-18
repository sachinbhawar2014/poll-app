import React, { useContext, useEffect } from "react";
// import axiosInstance from "../api/axiosinstance";
import { PollContext } from "../context/PollContext";
import axios from "axios";
// import { configDotenv } from "dotenv";
// configDotenv();

// const url = process.env.REACT_APP_API_URL;
const Home = () => {
    const { currentPoll, setCurrentPoll } = useContext(PollContext);

    useEffect(() => {
        fetch("https://poll-app-7tos.onrender.com/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((data) => data.json())
            .then((res) => {
                console.log(res.data);
                setCurrentPoll(res.data);
            });
        // const fetchPoll = async () => {

        //     const responce = await axios.get(url);
        //
        //     console.log(responce.data);
        // };
        // fetchPoll();
    }, []);

    return <div className="flex flex-col items-center">Homepage</div>;
};

export default Home;
