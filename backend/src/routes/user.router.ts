import { Router } from "express";

import {
  createUser,
  loginUser,
  getAccountUser,
  editUserProfile,
  createOrder
} from "../controllers/user";

const router = Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

router.get("/account", getAccountUser);

router.post("/edit", editUserProfile);

router.post("/addOrder", createOrder);

export default router;
