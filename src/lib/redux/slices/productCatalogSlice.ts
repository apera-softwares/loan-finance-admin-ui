import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "@/api";

// Create Product
export const createProductCatalog = createAsyncThunk(
  "productCatalog/createProductCatalog",
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;
      console.log("payload in thunk function",data);

      const response = await axios.post(`${BACKEND_API}product`, data, {
        headers: { Authorization: `Bearer ${token}`, 
       'ngrok-skip-browser-warning': 'true',
     },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product catalog"
      );
    }
  }
);

// Fetch Product Catalogs with filters (pagination, sorting, search)
export const fetchProductCatalogs = createAsyncThunk(
  "productCatalog/fetchProductCatalogs",
  async (params: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;

      const { order, role, page, limit, name } = params;

      const response = await axios.get(
        `${BACKEND_API}admin/products?limit=5&page=1`,
        {
          headers: { Authorization: `Bearer ${token}`,   'ngrok-skip-browser-warning': 'true', },
          
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product catalogs"
      );
    }
  }
);

// Update Product
export const updateProductCatalog = createAsyncThunk(
  "productCatalog/updateProductCatalog",
  async ({ id, ...data }: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;

      const response = await axios.put(`${BACKEND_API}product/${id}`, data, {
        headers: { Authorization: `Bearer ${token}`,  'ngrok-skip-browser-warning': 'true', },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product catalog"
      );
    }
  }
);

// Delete Product
export const deleteProductCatalog = createAsyncThunk(
  "productCatalog/deleteProductCatalog",
  async (id: string, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.user?.user?.token;

      const response = await axios.delete(`${BACKEND_API}product/${id}`, {
        headers: { Authorization: `Bearer ${token}`,   'ngrok-skip-browser-warning': 'true', },
      });

      return id; // Return deleted id to update state if needed
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product catalog"
      );
    }
  }
);

// State interface
interface ProductCatalogState {
  productCatalogs: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductCatalogState = {
  productCatalogs: [],
  loading: false,
  error: null,
};

const productCatalogSlice = createSlice({
  name: "productCatalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(createProductCatalog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductCatalog.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally push or refetch data on UI side
      })
      .addCase(createProductCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch
    builder
      .addCase(fetchProductCatalogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductCatalogs.fulfilled, (state, action) => {
        state.loading = false;
        state.productCatalogs = action.payload.data || [];
      })
      .addCase(fetchProductCatalogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update
    builder
      .addCase(updateProductCatalog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductCatalog.fulfilled, (state, action) => {
        state.loading = false;
        // We don't update the state here, refetch on UI side
      })
      .addCase(updateProductCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete
    builder
      .addCase(deleteProductCatalog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductCatalog.fulfilled, (state, action) => {
        state.loading = false;
        // Again, refetch after delete, or you can remove from array here
      })
      .addCase(deleteProductCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productCatalogSlice.reducer;
