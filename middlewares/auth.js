import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const tokenValue = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = await User.findById(decoded);
        next();
    } catch (error) {
        next(new ErrorHandler(error.message, 401));
    }
}

export default isAuthenticated;