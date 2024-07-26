import express from "express";

import protectRoute from "../middlewares/protect-route";
import { getSidebarUsers } from "../controllers/user-controller";

const router = express.Router();

router.get("/", protectRoute, getSidebarUsers);

export default router;
