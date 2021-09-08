import { Router } from "express";

import {
  createMaster,
  loginMaster,
} from "../controllers/master";

const router = Router();
router.get("/", (req, res) => {
  res.json({hello: 'hello'});
  
});

router.post("/signup", createMaster);

router.post("/login", loginMaster);


export default router;
