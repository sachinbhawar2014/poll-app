import React, { Suspense, useCallback, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { PollContext } from "./context/PollContext";

const Home = React.lazy(() => import("./pages/Home"));
const New = React.lazy(() => import("./pages/New"));
const All = React.lazy(() => import("./pages/All"));

function App() {
    console.log("app component loaded");
    const inputRef = useRef(null);
    const { userEmail, setUserEmail } = useContext(PollContext);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const email = inputRef.current?.value?.trim();

        if (!email) {
            alert("Please enter a valid email address");
            return;
        }

        setUserEmail(email);
    }, []);

    const handleChange = useCallback((e) => {
        inputRef.current = e.target;
    }, []);

    if (!userEmail) {
        return (
            <div className="w-full h-full flex flex-col items-center">
                <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[300px]">
                        <h3>Welcome to quick poll portal! Please Enter your email.</h3>
                    </div>
                    <form className="p-2 rounded-md flex flex-col gap-2" onSubmit={handleSubmit}>
                        <input
                            className="bg-gray-600 p-2 rounded-md text-white"
                            type="email"
                            placeholder="enter your email"
                            onChange={handleChange}
                            ref={inputRef}
                        ></input>
                        <button
                            type="submit"
                            className="bg-green-500 text-blue-700 p-2 rounded-md hover:text-red-600 hover:font-bold transition ease-in 0.2s"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/new" element={<New />} />
                        <Route path="/all" element={<All />} />
                    </Routes>
                </Router>
            </Suspense>
        </div>
    );
}

export default App;
