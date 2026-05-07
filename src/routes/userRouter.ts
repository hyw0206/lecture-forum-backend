import { Router } from "express";
import userController from "../controllers/userController.ts";

const router = Router();

// 이 라우터를 post로 접근하면 할 처리
router.post("/create", userController.createUser);

export default router;
