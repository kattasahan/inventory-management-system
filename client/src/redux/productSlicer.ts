import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/api";
import { Product } from "@/models/product.model";

export interface ProductState {
  isLoading: boolean;
  data: Product[] | null;
  error: boolean;
}

const initialState: ProductState = {
  isLoading: false,
  data: null,
  error: false,
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const data = await axios.get("/product/getAll");
  return data.data?.products;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = true;
    });
  },
  reducers: {},
});

export default productSlice.reducer;
