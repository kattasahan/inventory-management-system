import { RegisterPayload } from "@/models/auth.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/redux/api";

export interface AuthState {
  isLoading: boolean;
  data: any;
  error: any;
}

const initialState: AuthState = {
  isLoading: false,
  data: null,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (regPayload: RegisterPayload) => {
    const response = await axios.post("/user/register", regPayload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

const authSlicer = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
  reducers: {},
});

export default authSlicer.reducer;
