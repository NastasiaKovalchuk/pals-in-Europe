import { Router } from "express";

import {
  createMaster,
  loginMaster,
  getAllMasters,
} from "../controllers/master";

const router = Router();

router.get("/", getAllMasters);

router.post("/signup", createMaster);

router.post("/login", loginMaster);

export default router;
