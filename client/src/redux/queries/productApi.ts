import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse } from "@/models/product.model";

export const productQuery = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<AllProductsResponse, void>({
      query: () => "/product/getAll",
    }),
  }),
});

export const { useGetAllProductsQuery } = productQuery;
