// src/redux/slices/userManagementSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "@/api";

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (params: any, thunkAPI) => {
      try {
        const state: any = thunkAPI.getState();
        const token = state.user?.user?.token; 
        const {page,limit,name}= params;
    
      const queryParams = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          order:"desc",
      });

      if (name) {
      queryParams.append("name", name);
      }

        const response = await axios.get(`${BACKEND_API}admin/users?${queryParams.toString()}`, {
          headers: { Authorization: `Bearer ${token}`, 
         'ngrok-skip-browser-warning': 'true',
         
       },
        });
  
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch users");
      }
    }
  );



  export const CreateUser = createAsyncThunk(
    "user/Create",
    async (data: any, thunkAPI) => {
      try {
        const state: any = thunkAPI.getState();
        const token = state.user?.user?.token;
  
        const response = await axios.post(
          `${BACKEND_API}admin/user`,
          data, 
          {
            headers: { Authorization: `Bearer ${token}`, 
           'ngrok-skip-browser-warning': 'true',
             'Content-Type': 'application/json',
         },
          }
        );
        console.log("create user resonse in thunk",response)
  
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Failed to Create user"
        );
      }
    }
  );

  export const UpdateUser = createAsyncThunk(
    "user/Update",
    async (data: any, thunkAPI) => {
      try {
        const state: any = thunkAPI.getState();
        const token = state.user?.user?.token;
        const { id, ...restData } = data; 
  
        const response = await axios.put(
          `${BACKEND_API}admin/user/${id}`,
          restData, 
          {
            headers: { Authorization: `Bearer ${token}`, 
           'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
         },
          }
        );
  
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Failed to update user"
        );
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

    //Get Users
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


      //Create User
      builder
      .addCase(CreateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.users = [];
      })
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(CreateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      //Update User
      builder
      .addCase(UpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.users = [];
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });



  },
});

export default userManagementSlice.reducer;
