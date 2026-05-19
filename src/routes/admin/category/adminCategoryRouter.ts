import { Router } from "express";
import adminCategoryController from "../../../controllers/admin/adminCategoryController.ts";
import { adminCreateCategorySchema } from "../../../schemas/admin/category/createCategory.ts";
import { validate } from "../../../middlewares/validate.ts";

const router = Router();

router.post("/create", validate(adminCreateCategorySchema), adminCategoryController.createCategory);
router.get("/list", adminCategoryController.getCategoryList);

router.patch("/:id/status", adminCategoryController.toggleCategoryStatus);

export default router;
