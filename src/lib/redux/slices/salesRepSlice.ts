// src/redux/slices/userManagementSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "@/api";

export const fetchSalesReps = createAsyncThunk(
    "user/fetchSalesReps",
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

        const response = await axios.get(`${BACKEND_API}sales-reps?${queryParams.toString()}`, {
          headers: { Authorization: `Bearer ${token}`, 
         'ngrok-skip-browser-warning': 'true',
         
       },
        });
  
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch SalesReps");
      }
    }
  );



  export const CreateSalesReps = createAsyncThunk(
    "user/Create",
    async (data: any, thunkAPI) => {
      try {
        const state: any = thunkAPI.getState();
        const token = state.user?.user?.token;
  
        const response = await axios.post(
          `${BACKEND_API}sales-reps`,
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

  export const UpdateSalesReps = createAsyncThunk(
    "user/Update",
    async (data: any, thunkAPI) => {
      try {
        const state: any = thunkAPI.getState();
        const token = state.user?.user?.token;
        const { id, ...restData } = data; 
  
        const response = await axios.put(
          `${BACKEND_API}sales-reps/${id}`,
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
  

interface SalesRepstate {
  SalesReps: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SalesRepstate = {
  SalesReps: [],
  loading: false,
  error: null,
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    //Get SalesReps
    builder
      .addCase(fetchSalesReps.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.SalesReps = [];
      })
      .addCase(fetchSalesReps.fulfilled, (state, action) => {
        state.loading = false;
        state.SalesReps = action.payload;
      })
      .addCase(fetchSalesReps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });


      //Create SalesReps
      builder
      .addCase(CreateSalesReps.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.SalesReps = [];
      })
      .addCase(CreateSalesReps.fulfilled, (state, action) => {
        state.loading = false;
        state.SalesReps = action.payload;
      })
      .addCase(CreateSalesReps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      //Update SalesReps
      builder
      .addCase(UpdateSalesReps.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.SalesReps = [];
      })
      .addCase(UpdateSalesReps.fulfilled, (state, action) => {
        state.loading = false;
        state.SalesReps = action.payload;
      })
      .addCase(UpdateSalesReps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });



  },
});

export default userManagementSlice.reducer;
