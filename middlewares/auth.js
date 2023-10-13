import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

const isAuthenticated = async (req,res,next) => {
    const token = req.headers.authorization;
    console.log(token);
    if(!token) return next(new ErrorHandler("Please Login first", 400))
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded);
    next();
}

export default isAuthenticated;