import { z } from "zod";

const product = {
  name: z.string(),
  price: z.number(),
  category: z.enum(["jewelery", "electronics", "clothes"]),
};

export const AddProductSchema = z.object(product);

export const UpdateProductSchema = z.object({
  ...product,
  id: z.string(),
});
