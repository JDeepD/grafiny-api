import express from "express";
import { isAuthenticated } from "src/middlewares";
import {
  createSemester,
  getAllSemester,
  getSemester,
  deleteSemester,
} from "src/controllers/Semester";

const router = express.Router();

router.post("/create", isAuthenticated, createSemester);
router.get("/getAll", isAuthenticated, getAllSemester);
router.get("/get", isAuthenticated, getSemester);
router.delete("/", isAuthenticated, deleteSemester);

export default router;
