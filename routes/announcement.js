import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { addAnnouncement, allAnnouncements, deleteAnnouncement, editAnnouncement } from "../controllers/announcement.js";

const router = new express.Router();

router.route("/").get(isAuthenticated, allAnnouncements).post(isAuthenticated, addAnnouncement);
router.route("/:id").patch(isAuthenticated, editAnnouncement).delete(isAuthenticated, deleteAnnouncement);

export default router;
