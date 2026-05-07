import { Request, Response } from "express";
import { UserCreateInput } from "../generated/prisma/models/User.ts";
import userService from "../services/userService.ts";

const createUser = (req: Request, res: Response) => {
  try {
    const { username, password, name, nickname, email, phoneNumber, birthdate, gender, role } =
      req.body;
    // 얘네 다 any 타입인데요?
    // prisma가 미리 정의해 준 타입이 있음 그거 써
    const userData: UserCreateInput = {
      username,
      password,
      name,
      nickname,
      email,
      phoneNumber,
      birthdate: birthdate ? new Date(birthdate) : null,
      gender,
      role,
    };

    const newUser = userService.createUser(userData);
    // response의 status code 처리
    // 201 Created
    res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "유저 생성 중 에러 발생" });
  }
};

export default {
  createUser,
};
