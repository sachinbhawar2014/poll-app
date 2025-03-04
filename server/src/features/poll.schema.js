import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        option: String,
        responses: [String],
    },
    { _id: false }
);

const pollSchema = new mongoose.Schema(
    {
        question: String,
        answers: [answerSchema],
        acceptMultipleOptions: { type: Boolean, default: false, required: true },
    },
    { collection: "Poll" }
);

const pollModel = new mongoose.model("Poll", pollSchema);

export default pollModel;
