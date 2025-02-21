import { createContext, useState } from "react";

export const PollContext = createContext();

const PollContextProvider = ({ children }) => {
    const [currentPoll, setCurrentPoll] = useState({});
    const [userEmail, setUserEmail] = useState("");
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [userResponse, setUserResponse] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <PollContext.Provider
            value={{
                currentPoll,
                setCurrentPoll,
                userEmail,
                setUserEmail,
                selectedAnswers,
                setSelectedAnswers,
                userResponse,
                setUserResponse,
                error,
                setError,
                loading,
                setLoading,
            }} // ✅ Used an object `{}` instead of `()`
        >
            {children}
        </PollContext.Provider>
    );
};

export default PollContextProvider;
