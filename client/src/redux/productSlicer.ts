import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/redux/api";
import { Product } from "@/models/product.model";

export interface ProductState {
  isLoading: boolean;
  data: Product[] | null;
  error: any;
}

const initialState: ProductState = {
  isLoading: false,
  data: null,
  error: null,
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await axios.get("/product/getAll");
  return response.data?.products;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
  reducers: {},
});

export default productSlice.reducer;
