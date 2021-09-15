import { Router } from "express";

import {
  createUser,
  loginUser,
  getAccountUser,
  editUserProfile,
  createOrder,
  getUserOrder,
  getUserReviews
} from "../controllers/user";

const router = Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

router.get("/account", getAccountUser);

router.post("/edit", editUserProfile);

router.post("/addOrder", createOrder);

router.get("/orders", getUserOrder);

router.get("/reviews", getUserReviews);

export default router;
