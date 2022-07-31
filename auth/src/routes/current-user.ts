import express from "express";
import { requireAuth } from "@ostoica/common";

import { currentUserController } from "../controllers/current-user";

const router = express.Router();

router.get("/api/users/currentuser", requireAuth, currentUserController);

export { router as currentUserRouter };
