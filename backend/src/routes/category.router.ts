import { Router } from "express";

import {
  getAllCategoriesFromSaga,
} from "../controllers/category";

const router = Router();

router.get("/", getAllCategoriesFromSaga);

export default router;
