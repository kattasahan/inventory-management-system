import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AddProductSchema, UpdateProductSchema } from "../models/productModels";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const getProduct = asyncHandler(async (req: Request, res: Response) => {});

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const { name, category } = req.body;

  const products = await prisma.product.findMany({
    where: {
      AND: [
        { name: name ? { contains: name } : undefined },
        { category: category ? { contains: category } : undefined },
      ],
    },
  });

  res.send({
    success: true,
    products,
  });
});

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, category } = req.body;

  // Zod Validations
  const zRes = AddProductSchema.safeParse({ name, price, category });

  if (zRes.error) {
    res.status(400);
    throw new Error(zRes.error.toString());
  }

  // Create Product
  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      category,
    },
  });

  // Response
  if (newProduct) {
    res.send({
      message: "Product created Successfully",
      success: true,
      productDetails: newProduct,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong!!!, Please try again later");
  }
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id, name, price, category } = req.body;

  const zRes = UpdateProductSchema.safeParse({ id, name, price, category });

  if (zRes.error) {
    res.status(400);
    throw new Error(zRes.error.toString());
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      category,
    },
  });

  if (updatedProduct) {
    res.send({
      message: "Product updated Successfully",
      success: true,
      productDetails: updatedProduct,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong!!!, Please try again later");
  }
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Contact dev team with product details");
  }

  const deletedProduct = await prisma.product.delete({ where: { id } });

  if (deletedProduct) {
    res.send({
      message: "Product deleted Successfully",
      success: true,
      productDetails: deletedProduct,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong!!!, Please try again later");
  }
});

export {
  // getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
