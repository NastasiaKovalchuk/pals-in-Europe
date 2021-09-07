import { Router } from "express";

import {
  checkUser,
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/user";

const router = Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/check", checkUser);

export default router;
