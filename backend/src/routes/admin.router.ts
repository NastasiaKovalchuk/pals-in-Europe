import { Router } from "express";

import {
  checkAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/admin";

const router = Router();

router.post("/login", loginAdmin);

router.get("/logout", logoutAdmin);

router.get("/check", checkAdmin);

export default router;
