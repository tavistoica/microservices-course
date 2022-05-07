import express from "express";
import { logoutController } from "../controllers/logout";

const router = express.Router();

router.post("/api/users/logout", logoutController);

export { router as logoutRouter };
