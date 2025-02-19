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
app.use(
    cors({
        origin: "http://localhost:3700", // Allow only your frontend origin
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3700");
    res.header("Access-Control-Allow-Credentials", "true"); // Allow cookies/sessions
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.post("/new", createPoll);
app.get("/", getCurrentQuestion);
app.get("/all", getAllQuestions);
app.get("/:qid", setCurrentQuestion);
app.put("/:qid", answerCurrentQuestion);
app.delete("/:qid", clearPreviousResponce);

export default app;
