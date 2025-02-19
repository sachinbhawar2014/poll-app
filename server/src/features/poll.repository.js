import pollModel from "./poll.schema.js";
import currentPollModel from "./currentpoll.schema.js";

export const getCurrentQuestionRepo = async () => {
    try {
        const currentPoll = await currentPollModel.find();

        if (currentPoll.length == 0) throw new Error("Current poll not found");

        const question = await pollModel.findById(currentPoll[0].questionId);

        return question;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllQuestionsRepo = async () => {
    try {
        const allQue = await pollModel.find();

        if (!allQue.length) throw new Error("Not poll Questions are available .");

        return allQue;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const setCurrentQuestionRepo = async (questionId) => {
    try {
        // Validate input
        if (!questionId || typeof questionId !== "string") {
            throw new Error("Invalid questionId provided");
        }

        // Find current poll with proper error handling
        const currentPoll = await currentPollModel.find();

        // Check if poll exists
        if (!currentPoll || currentPoll.length === 0) {
            throw new Error("Current poll not found");
        }

        // Get the first poll
        const currentQ = currentPoll[0];

        // Create updated document
        const updatedPoll = { ...currentQ.toObject(), questionId };

        // Save the updated document
        const savedPoll = await currentPollModel.findByIdAndUpdate(currentQ._id, updatedPoll, { new: true });

        // Verify the save was successful
        if (!savedPoll) {
            throw new Error("Failed to update poll");
        }

        const currentQue = await getCurrentQuestionRepo();

        return { savedPoll, currentQue };
    } catch (error) {
        console.error("Error updating poll:", error.message);
        throw error;
    }
};

export const answerCurrentQuestionRepo = async (qid, answerArr, userEmail) => {
    try {
        const question = await pollModel.findById(qid);
        if (!question) throw new Error("poll question not found");

        for (const ans of answerArr) {
            await pollModel.updateOne(
                { _id: qid, "answers.option": ans }, // Find by ID and option
                { $addToSet: { "answers.$.responses": userEmail } } // Add response if not exists
            );
        }

        return question;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const clearPreviousResponceRepo = async (qid, answer, userEmail) => {
    try {
        const question = await pollModel.findById(qid);
        if (!question) throw new Error("poll question not found");

        for (const ans of answer) {
            await pollModel.updateOne(
                { _id: qid, "answers.option": ans }, // Find by ID and option
                { $pull: { "answers.$.responses": userEmail } } // Add response if not exists
            );
        }

        return question;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
// above code works fine
export const createPollRepo = async (poll) => {
    try {
        const existingQuestion = await pollModel.findOne({ question: poll.question });

        if (existingQuestion) throw new Error("This question exist already.");

        if (!poll.question || !poll.answers) throw new Error("invalid data input", 400);
        const newPoll = await pollModel.insertOne(poll);
        console.log(newPoll._id);

        await setCurrentQuestionRepo(newPoll._id.toString()); // set currentQuestion as newly created question

        return newPoll;
    } catch (error) {
        throw error;
    }
};
