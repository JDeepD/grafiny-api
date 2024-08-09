import express from "express";
import { isAuthenticated } from "src/middlewares";
import {
  createTopic,
  getAllTopics,
  getTopic,
  deleteTopic,
} from "src/controllers/Topics";

const router = express.Router();

router.post("/create", isAuthenticated, createTopic);
router.get("/getAll", isAuthenticated, getAllTopics);
router.get("/get", isAuthenticated, getTopic);
router.delete("/", isAuthenticated, deleteTopic);

export default router;
