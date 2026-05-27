import { Request, Response } from "express";
import postService from "../services/postService.ts";

const getPostsByCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = Number(req.params.categoryId);
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 20;

        if (isNaN(categoryId)) {
            res.status(400).json({
                message: "유효하지 않은 카테고리 ID",
            });
            return;
        }

        const result = await postService.getPostsByCategory(categoryId, page, size);

        res.status(200).json({
            message: "게시물을 성공적으로 불러왔습니다.",
            data: result,
        });
    } catch (e) {
        res.status(500).json({
            message: "서버 에러가 발생했습니다.",
        });
    }
};

export default {
    getPostsByCategory,
};
