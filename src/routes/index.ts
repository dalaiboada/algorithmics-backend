import { Router } from "express";
import testRoutes from "@/routes/v1/test.routes";
import userRoutes from "@/routes/v1/user.routes";
import authRoutes from "@/routes/v1/auth.routes";

const router = Router();

router.use("/api/v1/test", testRoutes);
router.use("/api/v1/user", userRoutes);
router.use("/api/v1/auth", authRoutes);

export default router;
