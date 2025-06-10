import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "@/api";

// create withdrawal
export const createWithdrawal = createAsyncThunk(
  "withdrawal/createWithdrawal",
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;
      const response = await axios.post(
        `${BACKEND_API}withdraw-request`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create withdrawal request"
      );
    }
  }
);

// fetch withdrawals
export const fetchWithdrawals = createAsyncThunk(
  "withdrawal/fetchWithdrawals",
  async (params: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;

      const { page, limit, name } = params;

      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (name) {
        queryParams.append("name", name);
      }

      const response = await axios.get(
        `${BACKEND_API}withdraw-request?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch withdrawals"
      );
    }
  }
);

// update withdrawal
export const updateWithdrawal = createAsyncThunk(
  "withdrawal/updateWithdrawal",
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;
      const { id, ...restData } = data;

      const response = await axios.put(
        `${BACKEND_API}withdraw-request/update/${id}`,
        restData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update withdrawal"
      );
    }
  }
);

// delete withdrawal
export const deleteWithdrawal = createAsyncThunk(
  "withdrawal/deleteWithdrawal",
  async (id: string, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;

      await axios.delete(
        `${BACKEND_API}user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete withdrawal"
      );
    }
  }
);

interface WithdrawalState {
  withdrawals: any[];
  loading: boolean;
  error: string | null;
}

const initialState: WithdrawalState = {
  withdrawals: [],
  loading: false,
  error: null,
};

const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(createWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWithdrawal.fulfilled, (state) => {
        state.loading = false;
        //refetch data on UI side
      })
      .addCase(createWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch
    builder
      .addCase(fetchWithdrawals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWithdrawals.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawals = action.payload.data || [];
      })
      .addCase(fetchWithdrawals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update
    builder
      .addCase(updateWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWithdrawal.fulfilled, (state) => {
        state.loading = false;
        //refetch data on UI side
      })
      .addCase(updateWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete
    builder
      .addCase(deleteWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWithdrawal.fulfilled, (state) => {
        state.loading = false;
        //refetch data on UI side
      })
      .addCase(deleteWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default withdrawalSlice.reducer;
