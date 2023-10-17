import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { addAnnouncement, allAnnouncements, deleteAnnouncement, editAnnouncement } from "../controllers/announcement.js";
import { validateAnnouncementCreate, validateAnnouncementUpdate } from "../utils/validators.js";

const router = new express.Router();

router.route("/").get(isAuthenticated, allAnnouncements).post(isAuthenticated, validateAnnouncementCreate(), addAnnouncement);
router.route("/:id").patch(isAuthenticated, validateAnnouncementUpdate(), editAnnouncement).delete(isAuthenticated, deleteAnnouncement);

export default router;
