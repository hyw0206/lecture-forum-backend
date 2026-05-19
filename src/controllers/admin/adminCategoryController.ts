import { Request, Response } from "express";
import adminCategoryService from "../../services/admin/adminCategoryService.ts";
import { CategoryCreateInput } from "../../generated/prisma/models/Category.ts";
import { CategoryStatus } from "../../generated/prisma/enums.ts";

const getCategoryList = async (req: Request, res: Response) => {
    try {
        const result = await adminCategoryService.getCategoryList();

        res.status(200).json({
            message: "success",
            data: result,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "카테고리 목록 조회 중 서버 에러 발생" });
    }
};

const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const newCategory: CategoryCreateInput = { name };

        const result = await adminCategoryService.createCategory(newCategory);

        res.status(201).json({
            message: "카테고리가 정상적으로 생성되었습니다",
            data: result,
        });
    } catch (e) {
        if (e instanceof Error) {
            if (e.message === "ALREADY_EXIST_CATEGORY") {
                res.status(409).json({ message: "이미 존재하는 카테고리 이름입니다." });
                return;
            }
        }
        console.log(e);
        res.status(409).json({ message: "카테고리 생성 중 서버 에러 발생" });
    }
};

const toggleCategoryStatus = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: "유효하지 않은 카테고리 ID" });
            return;
        }
        const result = await adminCategoryService.toggleCategoryStatus(id);

        res.status(200).json({
            message: `카테고리 ${result.status === CategoryStatus.ACTIVE ? "활성화" : "비활성화"}`,
            data: result,
        });
    } catch (e) {
        if (e instanceof Error && e.message === "CATEGORY_NOT_FOUND") {
            res.status(400).json({ message: "카테고리를 찾을 수 없습니다." });
            return;
        }
        console.log(e);
        res.status(500).json({ message: "서버 에러 발생." });
    }
};
export default { getCategoryList, createCategory, toggleCategoryStatus };
