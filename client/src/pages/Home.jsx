import React, { useContext, useEffect } from "react";
import axiosInstance from "../api/axiosinstance";
import { PollContext } from "../context/PollContext";

const Home = () => {
    const { currentPoll, setCurrentPoll } = useContext(PollContext);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await axiosInstance.get("/");
                console.log("Fetched Data:", response.data.data);
                setCurrentPoll(response.data.data);
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

    return (
        <>Homepage</>
        // <div className="p-4 border rounded-lg shadow-lg">
        //     <h3 className="text-lg font-semibold mb-2">{currentPoll.question}</h3>
        //     <div className="flex flex-col space-y-2">
        //         {currentPoll.answers.map((answer, index) => (
        //             <label key={index} className="flex items-center space-x-2">
        //                 <input
        //                     type={currentPoll.acceptMultipleOptions ? "checkbox" : "radio"}
        //                     name="question"
        //                     value={answer.option}
        //                     checked={
        //                         currentPoll.acceptMultipleOptions
        //                             ? selectedAnswers.includes(answer.option)
        //                             : selectedAnswers === answer.option
        //                     }
        //                     onChange={handleChange}
        //                     className="w-4 h-4"
        //                 />
        //                 <span>{answer.option}</span>
        //             </label>
        //         ))}
        //     </div>
        //     <div className="mt-4">
        //         <strong>Selected Answer(s):</strong>{" "}
        //         {/* {currentPoll.acceptMultipleOptions ? selectedAnswers.join(", ") : selectedAnswers} */}
        //     </div>
        // </div>
    );
};

export default Home;
