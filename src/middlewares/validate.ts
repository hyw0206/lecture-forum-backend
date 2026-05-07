import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

// middleware
// Express가 데이터를 전송하는 데 중간에 가로채서 무언가를 할 함수
// middleware (req, res, next) => {}

export const validate = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 실제 검증 처리
    // .safeParseAsync(검증당할데이터)
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      // 실패 시

      // 에러 사유 전달
      const errorMessage = result.error.issues.map(issue => ({
        field: issue.path.join(""),
        message: issue.message,
      }));
      res.status(400).json({ message: "잘못된 입력 값입니다.", error: errorMessage });
      return;
    }

    req.body = result.data;
    next();
  };
};
