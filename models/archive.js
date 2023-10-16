import mongoose from "mongoose";

const archiveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    announcement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Announcement",
        required: true
    }
})

export const Archive =  mongoose.model("Archive", archiveSchema);