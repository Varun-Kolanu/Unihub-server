import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { addArchive, allArchives, deleteArchive } from "../controllers/archive.js";

const router = new express.Router();

router.route("").post(isAuthenticated, addArchive).get(isAuthenticated, allArchives);
router.route("/:id").delete(isAuthenticated, deleteArchive);

export default router;
