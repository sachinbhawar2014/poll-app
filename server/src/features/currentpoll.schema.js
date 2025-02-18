import mongoose from "mongoose";



const currentPollSchema = new mongoose.Schema(
    {
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    { collection: "Current" }
);

const currentPollModel = new mongoose.model("Current", currentPollSchema);

export default currentPollModel;
