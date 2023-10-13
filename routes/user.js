import { login,  myInfo, register, updateUser, deleteUser, allUsers, getUser } from "../controllers/user.js";
import express from "express";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me",isAuthenticated, myInfo);  
router.route("").get(allUsers);
router.route("/:id").get(getUser).patch(isAuthenticated, updateUser).delete(deleteUser);


export default router;