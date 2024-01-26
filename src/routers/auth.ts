import express from "express";
import {
  login,
  logout,
  adminLogin,
  superAdminLogin,
} from "../controllers/auth/index";

const router = express.Router();

router.get("/login", login);

router.get("/adminSignup", adminLogin);
router.get("/superAdminSignup", superAdminLogin);
router.get("/logout", logout);

export default router;
