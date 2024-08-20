import express from "express";
import { isAuthenticated } from "src/middlewares";
import { toggleBookmark } from "src/controllers/Bookmarks";

const router = express.Router();

router.post("/update", isAuthenticated, toggleBookmark);

export default router;
