import express from "express";
import { isAuthenticated } from "src/middlewares";
import { toggleLikes } from "src/controllers/Likes";

const router = express.Router();

router.post("/update", isAuthenticated, toggleLikes);

export default router;
