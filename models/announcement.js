import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        enum: ["apd", "bce", "bme", "cer", "che", "chy", "civ", "cse", "eee", "ece", "mst", "mat", "mec", "met", "min", "phe", "phy", "all"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Announcement =  mongoose.model("Announcement", announcementSchema);