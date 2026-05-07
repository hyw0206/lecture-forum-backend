import { Request, Response } from "express";

const createUser = (req: Request, res: Response) => {
  const { username, password, name, nickname, email, phoneNumber, birthdate, gender, role } =
    req.body;

  const newUser = {
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
};

export default {
  createUser,
};
