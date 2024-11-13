import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { UserLoginSchema, UserRegisterSchema } from "../models/userModels";
import { COOKIE_OPTIONS } from "../constants";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// sample payload body
// {
//   "username": "user1",
//   "email": "user2@gmail.com",
//   "password": "password1",
//   "role": "ADMIN"
// }
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, role, secret } = req.body;

  // Zod Validations
  const zRes = UserRegisterSchema.safeParse({
    username,
    email,
    password,
    role,
    secret,
  });

  if (zRes.error) {
    res.status(400);
    throw new Error(JSON.stringify(zRes.error.format()));
  }

  if (role === "ADMIN" && (!secret || secret !== process.env.ADMIN_SECRET)) {
    res.status(400);
    throw new Error("Invalid Secret");
  }

  // Existing email check
  const existingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingEmail) {
    res.status(403);
    throw new Error("Email already exists");
  }

  // Encrypt Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new User
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role,
    },
  });

  // Generate JWT Token
  const token = generateToken(newUser.id);

  // Set HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 Day
    sameSite: "none",
    secure: true,
  });

  // Response
  if (newUser) {
    res.send({
      message: "Signup Successfull!",
      success: true,
      role: newUser.role,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong!!!, Try again after sometime.");
  }
});

// sample payload body
// {
//   "email": "user1@gmail.com",
//   "password": "password1"
// }
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Zod Validations
  const zRes = UserLoginSchema.safeParse({ email, password });

  if (zRes.error) {
    res.status(400);
    throw new Error(zRes.error.toString());
  }

  // Does User Exists?
  const validUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!validUser) {
    res.status(404);
    throw new Error("User not found, Please Register/Signup");
  }

  // Compare Password
  const isCorrectPassword = await bcrypt.compare(password, validUser.password);

  // Generate JWT Token
  const token = generateToken(validUser.id);

  // Set HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 Day
    sameSite: "none",
    secure: true,
  });

  // Response
  if (isCorrectPassword) {
    res.send({
      message: "Login Successful",
      success: true,
      userDetails: {
        username: validUser.username,
        email: validUser.email,
        role: validUser.role,
      },
      // token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Password");
  }
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // 1 Day
    sameSite: "none",
    secure: true,
  });
  res.send({ message: "Logged out successfully" });
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({});
  res.send({ users });
});

export { registerUser, loginUser, logoutUser, getUsers };
