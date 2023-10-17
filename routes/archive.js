import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { addArchive, allArchives, deleteArchive } from "../controllers/archive.js";
import { validateArchiveCreate, validateArchiveDelete } from "../utils/validators.js";

const router = new express.Router();

router.route("").post(isAuthenticated, validateArchiveCreate(), addArchive).get(isAuthenticated, allArchives);
router.route("/:id").delete(isAuthenticated, validateArchiveDelete(), deleteArchive);

export default router;
