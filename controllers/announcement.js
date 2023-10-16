import { Announcement } from "../models/announcement.js";
import ErrorHandler from "../middlewares/error.js";

export const allAnnouncements = async (req, res, next) => {
    try {
        const announcements = await Announcement.find({
            $or: [
                { branch: 'all' },
                { branch: req.user.branch }
            ]
        });
        res.status(200).json(announcements)
    } catch (error) {
        next(error);
    }
}

export const addAnnouncement = async (req, res, next) => {
    try {
        const { title, description, deadline, type, branch } = req.body;
        if (branch === "all" && req.user.role !== "all_branch_admin" && req.user.role !== "super_admin") return next(new ErrorHandler("You can't add all branch announcement", 403))
        if (req.user.role !== "branch_admin" && req.user.role !== "super_admin") return next(new ErrorHandler("You can't add announcements", 403))
        if (req.user.role === "branch_admin" && branch !== req.user.branch) return next(new ErrorHandler("You can't add announcement of other branch", 403));

        const announcement = await Announcement.create({
            title,
            description,
            deadline,
            type,
            branch,
            admin: req.user._id
        })
        res.status(201).json(announcement);
    } catch (error) {
        next(error);
    }
}

export const editAnnouncement = async (req, res, next) => {
    try {
        const { id } = req.params;
        const announcement = await Announcement.findById(id);
        if (req.user._id.toString() !== announcement.admin.toString()) return next(new ErrorHandler("You can't edit this announcement", 403));
        const filteredFields = {
            title: "",
            description: "",
            deadline: "",
            type: "",
            branch: ""
        };
        for (const key in filteredFields) {
            if (req.body.hasOwnProperty(key)) {
                filteredFields[key] = req.body[key];
            }
            else {
                delete filteredFields[key];
            }
        }
        const editedAnnouncement = await Announcement.findByIdAndUpdate(
            id,
            filteredFields,
            {new: true}
        )
        res.status(200).json(editedAnnouncement)
    } catch (error) {
        next(error);
    }
}

export const deleteAnnouncement = async (req, res, next) => {
    try {
        const { id } = req.params;
        let announcement = await Announcement.findById(id);
        if (req.user._id.toString() !== announcement.admin.toString()) return next(new ErrorHandler("You can't delete this announcement", 403));
        announcement = await Announcement.findByIdAndDelete(id);
        res.status(200).json(announcement)
    } catch (error) {
        next(error);
    }
} 
