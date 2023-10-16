import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: String,
        enum: ["branch_admin", "all_branch_admin", "student", "super_admin"],
        default: "student",
        required: true
    },
    branch: {
        type: String,
        enum: ["apd", "bce", "bme", "cer", "che", "chy", "civ", "cse", "eee", "ece", "mst", "mat", "mec", "met", "min", "phe", "phy"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model("User", userSchema);