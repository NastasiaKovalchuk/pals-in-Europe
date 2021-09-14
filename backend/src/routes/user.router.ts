import { Router } from "express";
const upload = require("../middleware/upload");

import {
  createUser,
  loginUser,
  getAccountUser,
  editUserProfile
} from "../controllers/user";

const router = Router();

router.post("/signup", upload.single("picture"), createUser);

router.post("/login", loginUser);

router.get("/account", getAccountUser);

router.post("/edit", editUserProfile);

export default router;
