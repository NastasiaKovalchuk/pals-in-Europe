import { Router } from "express";

import {
  createUser,
  loginUser,
  getAccountUser
} from "../controllers/user";

const router = Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

router.get("/account", getAccountUser);

export default router;
