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
router.get("/getAll", getAllSemester);
router.get("/get", getSemester);
router.delete("/", isAuthenticated, deleteSemester);

export default router;
