import { Router } from "express";

import {
  createMaster,
  loginMaster,
  getAllMasters,
  getAccountMaster,
  editMasterProfile,
  // getAuthorReviews
  getReviews,
  test
} from "../controllers/master";

const router = Router();

router.get("/", getAllMasters);

router.post("/signup", createMaster);

router.post("/login", loginMaster);

router.get("/account", getAccountMaster);

router.post("/edit/:id", editMasterProfile);

// router.get("/account/reviews", getAuthorReviews);


router.get("/reviews", getReviews)
router.get("/test/:id", test)

export default router;
