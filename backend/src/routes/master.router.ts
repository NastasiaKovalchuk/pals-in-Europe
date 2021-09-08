import { Router } from "express";

import {
  checkMaster,
  createMaster,
  loginMaster,
  logoutMaster,
} from "../controllers/master";

const router = Router();

router.get("/", (req, res) => {
  res.json({hello: 'hello'});
  
});

router.post("/signup", createMaster);

router.post("/login", loginMaster);

router.get("/logout", logoutMaster);

router.get("/check", checkMaster);

export default router;
