import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exists", 400));
        const hashedPwd = await bcrypt.hash(password, 10);
        user = await User.create({ username, email, password: hashedPwd });
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
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
        if (!isMatch) return next(new ErrorHandler("Invalid email or password"));
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.status(201).json({
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
        const users = await User.find({})
        res.status(200)
            .json(users)
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{ $set: req.body }, {new: true});
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


