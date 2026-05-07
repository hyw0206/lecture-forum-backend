import { UserCreateInput } from "../generated/prisma/models/User.ts";
import prisma from "../cofnig/prisma.ts";

const createUser = async (data: UserCreateInput) => {
  // prisma.table.create(object) : insert 메서드

  // DB와의 '통신' 함수 => 비동기 함수

  // 하지만 CREATE 생성 시 User 객체 반환
  // 그걸 바로 리턴 시 await 생략 가능
  return prisma.user.create({
    data,
  });
};

export default {
  createUser,
};
