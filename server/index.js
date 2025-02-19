import express from "express";
import cors from "cors";

import {
    answerCurrentQuestion,
    clearPreviousResponce,
    createPoll,
    getAllQuestions,
    getCurrentQuestion,
    setCurrentQuestion,
} from "./src/features/poll.controller.js";

const app = express();

app.use(express.json());

// ✅ CORRECT CORS CONFIG

// const allowedOrigins = [
//     "http://localhost:3700", // Add your frontend URL here
//     // "https://your-frontend.com", // Add production frontend domain
// ];

app.use(
    cors({
        origin: "*",
        // (origin, callback) => {
        //     if (!origin || allowedOrigins.includes(origin)) {
        //         callback(null, origin); // Allow the specific origin
        //     } else {
        //         callback(new Error("Not allowed by CORS"));
        //     }
        // },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ✅ Define Routes
app.post("/new", createPoll);
app.get("/", getCurrentQuestion);
app.get("/all", getAllQuestions);
app.get("/:qid", setCurrentQuestion);
app.put("/:qid", answerCurrentQuestion);
app.delete("/:qid", clearPreviousResponce);

export default app;
