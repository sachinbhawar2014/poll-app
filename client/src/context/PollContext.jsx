import { createContext, useState } from "react";

export const PollContext = createContext();

const PollContextProvider = ({ children }) => {
    const [currentPoll, setCurrentPoll] = useState({});
    const [userEmail, setUserEmail] = useState("");
    const [userResponse, setUserResponse] = useState([]);

    return (
        <PollContext.Provider
            value={{ currentPoll, setCurrentPoll, userEmail, setUserEmail, userResponse, setUserResponse }} // ✅ Used an object `{}` instead of `()`
        >
            {children}
        </PollContext.Provider>
    );
};

export default PollContextProvider;
