import { Router } from "express";
const multerFunc = require("../middleware/upload");

import {
  createUser,
  loginUser,
  getAccountUser,
  editUserProfile,
  createOrder,
  getUserOrder,
  getUserReviews,
  createReview,
  changeStatusOrder,
  reviewMaster
} from "../controllers/user";

const router = Router();

router.post("/signup", multerFunc.single("picture"), createUser);

router.post("/login", loginUser);

router.get("/account", getAccountUser);

router.post("/edit", editUserProfile);

router.post("/addOrder", createOrder);

router.post("/addReview", createReview);

router.get("/orders", getUserOrder);

router.get("/reviews", getUserReviews);

router.post("/changeStatus", changeStatusOrder);

router.post("/reviewMaster", reviewMaster)

export default router;
