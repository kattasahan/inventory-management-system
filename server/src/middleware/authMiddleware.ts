import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, Please Login");
    }

    // Verify token
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);

    // Verify User
    const user = await prisma.user.findUnique({
      where: {
        id: isVerified.id,
      },
      select: {
        role: true,
      },
    });

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.body.role = user.role;

    next();
  }
);

const admin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.role !== "ADMIN") {
      res.status(401);
      throw new Error(
        "You are not an ADMIN, please upgrade your ROLE to access this route"
      );
    }
    next();
  }
);

export { protect, admin };
