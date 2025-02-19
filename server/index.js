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

app.post("/new", createPoll);
app.get("/", getCurrentQuestion);
app.get("/all", getAllQuestions);
app.get("/:qid", setCurrentQuestion);
app.put("/:qid", answerCurrentQuestion);
app.delete("/:qid", clearPreviousResponce);

export default app;
