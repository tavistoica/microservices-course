import express from "express";

import { currentUser } from "@ostoica/common";
import { currentUserController } from "../controllers/current-user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, currentUserController);

export { router as currentUserRouter };
