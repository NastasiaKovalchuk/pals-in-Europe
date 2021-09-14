import { Router } from "express";

import {
  createUser,
  loginUser,
  getAccountUser,
  editUserProfile
} from "../controllers/user";

const router = Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

router.get("/account", getAccountUser);

router.post("/edit", editUserProfile);

export default router;
