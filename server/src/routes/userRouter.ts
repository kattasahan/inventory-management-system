import { Router } from "express";
import {
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController";
import { admin, protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/getUsers", protect, admin, getUsers);

export default router;
