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
        origin: "*",
        credentials: false, // Important: must be false when using wildcard
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.post("/new", createPoll);
app.get("/", getCurrentQuestion);
app.get("/all", getAllQuestions);
app.get("/:qid", setCurrentQuestion);
app.put("/:qid", answerCurrentQuestion);
app.delete("/:qid", clearPreviousResponce);

export default app;
