import express from "express";

import { currentUser } from "@omstickets/common";
import { currentUserController } from "../controllers/current-user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, currentUserController);

export { router as currentUserRouter };
