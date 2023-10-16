import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!email.endsWith("@itbhu.ac.in") && !email.endsWith("@iitbhu.ac.in")) return next(new ErrorHandler("Please register with institute email ID", 403))
        const branchRegex = /([a-z]+)(\d+)@/;
        const branch = email.match(branchRegex)[1];
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exists", 400));
        const hashedPwd = await bcrypt.hash(password, 10);
        user = await User.create({ username, email, password: hashedPwd, branch });
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({
            token
        })
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("User does not exists", 404));
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid email or password", 400));
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            token
        })
    } catch (error) {
        next(error);
    }
}

export const myInfo = async (req, res, next) => {
    try {
        res.status(200)
            .json(req.user)
    } catch (error) {
        next(error);
    }
}

export const allUsers = async (req, res, next) => {
    try {
        if (req.user.role !== "branch_admin" && req.user.role !== "all_branch_admin" && req.user.role !== "super_admin") return next(new ErrorHandler("You must be an admin to see all users data", 403));
        let users = []
        if (req.user.role !== "super_admin") {
            users = await User.find({});
        }
        else if (req.user.role === "all_branch_admin") {
            users = await User.find({ role: "student" });
        }
        else if (req.user.role !== "branch_admin") {
            users = await User.find({
                $and: [
                    { role: "student" },
                    { branch: req.user.branch }
                ]
            })
        }
        res.status(200)
            .json(users)
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(req.user._id === req.params.id || (req.user.role === "super_admin" )) return res.status(200).json(user);
        if ((req.user.role === "all_branch_admin" && user.role === "student") || (req.user.role === "branch_admin" && user.role === "student" && user.branch === req.user.branch)) return res.status(200).json(user);
        return res.status(404).json({
            error: "Not found"
        })
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


