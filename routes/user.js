import { login,  myInfo, register, updateUser, deleteUser, allUsers, getUser } from "../controllers/user.js";
import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { validateRegisterData } from "../utils/validators.js";

const router = express.Router();
router.post("/register", validateRegisterData(), register);
router.post("/login", login);
router.get("/me",isAuthenticated, myInfo);  
router.route("").get(isAuthenticated, allUsers);
router.route("/:id").get(isAuthenticated, getUser).patch(isAuthenticated, updateUser).delete(deleteUser);


export default router;