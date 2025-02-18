import express from "express";
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

app.post("/new", createPoll);
app.get("/", getCurrentQuestion);
app.get("/all", getAllQuestions);
app.get("/:qid", setCurrentQuestion);
app.put("/:qid", answerCurrentQuestion);
app.delete("/:qid", clearPreviousResponce);

export default app;
