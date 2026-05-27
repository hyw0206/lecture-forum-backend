import type { Request, Response } from "express";
import categoryService from "../services/categoryService.ts";

const getActiveCategories = async (req: Request, res: Response) => {
    try {
        const list = await categoryService.getActiveCategories();
        res.status(200).json({
            message: "카테고리를 성공적으로 불러옴",
            data: list,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "에러 발생",
        });
    }
};

export default {
    getActiveCategories,
};
