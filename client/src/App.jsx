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
    const { userEmail, setUserEmail, error, setError } = useContext(PollContext);

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
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg w-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-xl font-semibold mb-4">Welcome to Quick poll app. Enter Your Email</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <input
                        type="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="w-full h-[100vh] flex flex-col items-center">
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
