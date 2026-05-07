import { z } from "zod";
import { GenderType } from "../../generated/prisma/enums.ts";

// zod로 검증할 객체 모양 생성
export const createUserSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
  name: z.string().min(2),
  nickname: z.string().min(2).max(50),
  email: z.email(),
  phoneNumber: z.string().optional(),
  birthdate: z.iso.datetime().optional(),
  gender: z.enum(GenderType),
});

// 위에서 만든 객체의 타입을 만들어줌
export type CreateUserInputType = z.infer<typeof createUserSchema>;
