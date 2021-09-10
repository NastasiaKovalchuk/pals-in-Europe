import { Router } from "express";

import {
   getAllCities,
} from "../controllers/category";

const locationRouter = Router();

locationRouter.get("/", getAllCities);

export default locationRouter;
