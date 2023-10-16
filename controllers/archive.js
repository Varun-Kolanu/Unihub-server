import { Archive } from "../models/archive.js";
import ErrorHandler from "../middlewares/error.js";
import mongoose, { isValidObjectId } from "mongoose";

export const allArchives = async (req, res, next) => {
    try {
        const archives = await Archive.find({ user: req.user });
        res.status(200).json(archives);
    } catch (error) {
        next(error);
    }
}

export const addArchive = async (req, res, next) => {
    try {
        const { announcement } = req.body;
        const archive = await Archive.create({
            user: req.user._id,
            announcement
        })
        res.status(200).json(archive);
    } catch (error) {
        next(error);
    }
}

export const deleteArchive = async (req, res, next) => {
    try {
        const { id } = req.params;
        const announcement = await Archive.findById(id);
        if (req.user._id.toString() !== announcement.user.toString()) return next(new ErrorHandler("You are not allowed to delete this archive"))
        await Archive.findByIdAndDelete(id);
        res.status(200).json(announcement)
    } catch (error) {
        next(error);
    }
}
