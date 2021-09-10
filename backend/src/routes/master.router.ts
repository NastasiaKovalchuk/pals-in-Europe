import { Router } from "express";

import {
  createMaster,
  loginMaster,
  getAllMasters,
  getAccount
} from "../controllers/master";

const router = Router();

router.get("/", getAllMasters);

router.post("/signup", createMaster);

router.post("/login", loginMaster);

router.get("/account", getAccount);
export default router;
