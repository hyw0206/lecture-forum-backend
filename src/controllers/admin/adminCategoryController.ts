import { Request, Response } from "express";
import adminCategoryService from "../../services/admin/adminCategoryService.ts";

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
export default { getCategoryList };
