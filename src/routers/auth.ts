import express from "express";
import {
  login,
  logout,
  adminLogin,
  superAdminLogin,
} from "../controllers/auth/index";

const router = express.Router();

router.post("/login", login);

router.post("/adminSignup", adminLogin);
router.post("/superAdminSignup", superAdminLogin);
router.get("/logout", logout);

export default router;
