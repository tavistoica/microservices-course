import express from "express";

import { verifyJWT } from "../middleware/verifyJWT";
import { currentUserController } from "../controllers/current-user";

const router = express.Router();

router.get("/api/users/currentuser", verifyJWT, currentUserController);

export { router as currentUserRouter };
