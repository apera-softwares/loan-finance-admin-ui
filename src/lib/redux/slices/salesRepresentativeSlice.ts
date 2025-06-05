import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "@/api";

// create sales representative
export const createSalesRepresentative = createAsyncThunk(
  "salesRepresentative/createSalesRepresentative",
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;
      const response = await axios.post(
        `${BACKEND_API}admin/user`,
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
        error.response?.data?.message || "Failed to create sales representative"
      );
    }
  }
);

// fetch sales representative with filters
export const fetchSalesRepresentatives = createAsyncThunk(
  "salesRepresentative/fetchSalesRepresentatives",
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
        `${BACKEND_API}sales-reps?${queryParams.toString()}`,
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
        error.response?.data?.message || "Failed to fetch sales representatives"
      );
    }
  }
);

// update sales representative
export const updateSalesRepresentative = createAsyncThunk(
  "salesRepresentative/updateSalesRepresentative",
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;
      const { id, ...restData } = data;

      const response = await axios.put(
        `${BACKEND_API}admin/user/${id}`,
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
        error.response?.data?.message || "Failed to update sales representative"
      );
    }
  }
);

// delete sales representative
export const deleteSalesRepresentative = createAsyncThunk(
  "salesRepresentative/deleteSalesRepresentative",
  async (id: string, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;

      const response = await axios.delete(
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
        error.response?.data?.message || "Failed to delete sales representative"
      );
    }
  }
);

interface SalesRepresentativeState {
  salesRepresentativesList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SalesRepresentativeState = {
  salesRepresentativesList: [],
  loading: false,
  error: null,
};

const salesRepresentativeSlice = createSlice({
  name: "salesRepresentative",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(createSalesRepresentative.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSalesRepresentative.fulfilled, (state) => {
        state.loading = false;
        //refetch data on UI side
      })
      .addCase(createSalesRepresentative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch
    builder
      .addCase(fetchSalesRepresentatives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesRepresentatives.fulfilled, (state, action) => {
        state.loading = false;
        state.salesRepresentativesList = action.payload.data || [];
      })
      .addCase(fetchSalesRepresentatives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update
    builder
      .addCase(updateSalesRepresentative.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSalesRepresentative.fulfilled, (state) => {
        state.loading = false;
        //refetch data on UI side
      })
      .addCase(updateSalesRepresentative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete
    builder
      .addCase(deleteSalesRepresentative.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSalesRepresentative.fulfilled, (state) => {
        state.loading = false;
        //refetch data on UI side
      })
      .addCase(deleteSalesRepresentative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default salesRepresentativeSlice.reducer;
