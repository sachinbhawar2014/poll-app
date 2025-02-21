import {
    getCurrentQuestionRepo,
    setCurrentQuestionRepo,
    getAllQuestionsRepo,
    answerCurrentQuestionRepo,
    clearPreviousResponceRepo,
    createPollRepo,
} from "./poll.repository.js";

export const getCurrentQuestion = async (req, res) => {
    try {
        const result = await getCurrentQuestionRepo();

        return res.status(200).json({
            success: true,
            message: "Poll question fetched successfully.",
            error: null,
            data: result,
        });
    } catch (error) {
        return res.status(error.code || 501).json({
            success: false,
            message: "operation failed",
            error: error.message,
            data: null,
        });
    }
};

export const getAllQuestions = async (req, res) => {
    try {
        const result = await getAllQuestionsRepo();

        return res.status(200).json({
            success: true,
            message: "All Poll questions fetched successfully.",
            error: null,
            data: result,
        });
    } catch (error) {
        return res.status(error.code || 501).json({
            success: false,
            message: "operation failed",
            error: error.message,
            data: null,
        });
    }
};

export const setCurrentQuestion = async (req, res) => {
    try {
        const result = await setCurrentQuestionRepo(req.params.qid);

        return res.status(200).json({
            success: true,
            message: "Set Curent question successfully.",
            error: null,
            data: result,
        });
    } catch (error) {
        return res.status(error.code || 501).json({
            success: false,
            message: "operation failed",
            error: error.message,
            data: null,
        });
    }
};

export const answerCurrentQuestion = async (req, res) => {
    try {
        const result = await answerCurrentQuestionRepo(req.params.qid, req.body.answers, req.body.userEmail);

        return res.status(200).json({
            success: true,
            message: "Your responce is recorded successfully.",
            error: null,
            data: result,
        });
    } catch (error) {
        return res.status(error.code || 501).json({
            success: false,
            message: "Error occured.",
            error: error.message,
            data: null,
        });
    }
};

export const clearPreviousResponce = async (req, res) => {
    try {
        const result = await clearPreviousResponceRepo(req.params.qid, req.body.answers, req.body.userEmail);

        return res.status(204).json({
            success: true,
            message: "Your responce is cleared successfully.",
            error: null,
            data: result,
        });
    } catch (error) {
        return res.status(error.code || 409).json({
            success: false,
            message: "Error occured.",
            error: error.message,
            data: null,
        });
    }
};

// above code works fine

export const createPoll = async (req, res) => {
    try {
        const question = req.body.question;
        const ansArr = req.body.answers;
        const acceptMultipleOptions = req.body.acceptMultipleOptions;

        console.log(ansArr);

        let answers = ansArr.map((element) => {
            return { option: element, responses: [] };
        });

        console.log("this", answers);
        const newAddedPoll = await createPollRepo({ question, answers, acceptMultipleOptions });

        return res.status(201).json({
            success: true,
            message: "Poll created successfully and set current question as this question.",
            error: null,
            data: newAddedPoll,
        });
    } catch (error) {
        return res.status(error.code || 501).json({
            success: false,
            message: "Error occured.",
            error: error.message,
            data: null,
        });
    }
};
