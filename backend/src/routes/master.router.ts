import { Router } from "express";

import {
  createMaster,
  loginMaster,
  getAllMasters,
  getAccountMaster,
  editMasterProfile
} from "../controllers/master";

const router = Router();

router.get("/", getAllMasters);

router.post("/signup", createMaster);

router.post("/login", loginMaster);

router.get("/account", getAccountMaster);

router.post("/profile", editMasterProfile);

export default router;
