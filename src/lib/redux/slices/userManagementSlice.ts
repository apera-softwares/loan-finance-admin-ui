// src/redux/slices/userManagementSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "@/api";

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (_, thunkAPI) => {
      try {
        const state: any = thunkAPI.getState();
        const token = state.user?.user?.token; // Assuming token is stored in user slice
  
        const response = await axios.get(`${BACKEND_API}admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        return response.data.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch users");
      }
    }
  );
  

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.users = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userManagementSlice.reducer;
