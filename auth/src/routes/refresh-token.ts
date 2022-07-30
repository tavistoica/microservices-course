import { Router } from "express";
import jwt from "jsonwebtoken";
import { handleRefreshToken } from "../controllers/refresh-token";

const router = Router();

// get new access token
router.post("/api/users/refresh-token", handleRefreshToken);

// // logout
// router.delete("/", async (req, res) => {
//   try {
//     if (!req.body.refreshToken)
//       return res
//         .status(400)
//         .json({ error: true, message: "Request body is incorrect." });

//     const userToken = await Token.findOne({ token: req.body.refreshToken });
//     if (!userToken)
//       return res
//         .status(200)
//         .json({ error: false, message: "Logged Out Sucessfully" });

//     await userToken.remove();
//     res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: true, message: "Internal Server Error" });
//   }
// });

export { router as refreshTokenRouter };
