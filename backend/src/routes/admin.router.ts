import { Router } from "express";

import {
  loginAdmin,
} from "../controllers/admin";

const router = Router();

router.post("/login", loginAdmin);

export default router;
