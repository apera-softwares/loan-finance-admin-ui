import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "@/api";

// Create Referral
export const createReferral = createAsyncThunk(
  "referral/createReferral",
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;
      const response = await axios.post(`${BACKEND_API}lead`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create referral "
      );
    }
  }
);

// Fetch referrals with filters (pagination)
export const fetchReferrals = createAsyncThunk(
  "referral/fetchReferrals",
  async (params: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;

      const { page, limit, searchQuery } = params;

      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (searchQuery) {
        queryParams.append("name", searchQuery);
      }

      const response = await axios.get(
        `${BACKEND_API}lead?${queryParams.toString()}`,
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
        error.response?.data?.message || "Failed to fetch referrals"
      );
    }
  }
);
// Fetch referral by id
export const fetchReferralById = createAsyncThunk(
  "referral/fetchReferralById",
  async (id: string, thunkAPI) => {
    try {

      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;

      const response = await axios.get(`${BACKEND_API}lead/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch referral by id"
      );
    }
  }
);

// Update referral
export const updateReferral = createAsyncThunk(
  "referral/updateReferral",
  async ({ id, ...data }: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;

      const response = await axios.put(`${BACKEND_API}lead/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product catalog"
      );
    }
  }
);

// Delete referral
export const deleteReferral = createAsyncThunk(
  "referral/deleteReferral",
  async (id: string, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;

      const response = await axios.delete(`${BACKEND_API}lead/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      console.log(response, "delete response");

      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product catalog"
      );
    }
  }
);

interface ReferralSliceState {
  referralList: any[];
  referralDetails: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReferralSliceState = {
  referralList: [],
  referralDetails: null,
  loading: false,
  error: null,
};

const productCatalogSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(createReferral.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReferral.fulfilled, (state) => {
        state.loading = false;
        //refetch data on UI side
      })
      .addCase(createReferral.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch
    builder
      .addCase(fetchReferrals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.referralList = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchReferrals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch single referral by ID
    builder
      .addCase(fetchReferralById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.referralDetails = null;
      })
      .addCase(fetchReferralById.fulfilled, (state, action) => {
        state.loading = false;
        state.referralDetails = action.payload.data;
        state.error = null;
      })
      .addCase(fetchReferralById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.referralDetails = null;
      });

    // Update
    builder
      .addCase(updateReferral.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReferral.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        //refetch data on UI side
      })
      .addCase(updateReferral.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete
    builder
      .addCase(deleteReferral.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReferral.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        //refetch data on UI side
      })
      .addCase(deleteReferral.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productCatalogSlice.reducer;
