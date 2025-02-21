import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosinstance";
import { PollContext } from "../context/PollContext";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const { currentPoll, setCurrentPoll, error, setError, selectedAnswers, setSelectedAnswers } =
        useContext(PollContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const responce = await fetch("https://poll-app-nies.onrender.com/", { method: "GET" });
                if (!responce.ok) setError("Error Occured while fetching data from backend");
                const dataFromServer = await responce.json();
                console.log(dataFromServer);
                setCurrentPoll(dataFromServer.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) =>{

    }

    const handleChange = (event) => {
        const { value } = event.target;

        console.log(currentPoll, selectedAnswers);
        if (currentPoll.acceptMultipleOptions) {
            // For multiple-choice, toggle selection
            setSelectedAnswers((prev) =>
                prev.includes(value) ? prev.filter((ans) => ans !== value) : [...prev, value]
            );
        } else {
            // For single choice, replace selected answer
            setSelectedAnswers([value]);
        }
    };

    if (error) {
        return <div className="">{error}</div>;
    }

    return (
        <div className="p-4 border rounded-lg shadow-lg bg-amber-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {loading ? (
                <div className="">Loading...</div>
            ) : (
                <div>
                    <h3 className="text-lg font-semibold mb-2">{currentPoll?.question}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col p-4 gap-0.5">
                            {Array.isArray(currentPoll?.answers) &&
                                currentPoll.answers.map((ans, index) => (
                                    <div key={index}>
                                        <input
                                            id={`{index}`}
                                            className="border-4 border-transparent appearance-none"
                                            type={currentPoll.acceptMultipleOptions ? "checkbox" : "radio"}
                                            name="question"
                                            value={ans.option}
                                            checked={selectedAnswers.includes(ans.option) || false}
                                            onChange={handleChange}
                                        />
                                        <label
                                            htmlFor={`{index}`}
                                            className="flex items-center space-x-2 border-2 border-blue-600 p-6 checked:border-red-500"
                                        >
                                            <span>{ans.option}</span>
                                        </label>
                                    </div>
                                ))}
                        </div>
                        <button type="submit" className="p-2">
                            Submit Responce
                        </button>
                    </form>
                    <div className="mt-4">
                        <strong>Selected Answer(s):</strong>{" "}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
