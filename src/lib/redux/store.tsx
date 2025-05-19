// lib/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import userManagementReducer from "./slices/userManagementSlice";
import productCatalogReducer from "./slices/productCatalogSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      UserManagement: userManagementReducer,
      productCatalog: productCatalogReducer,
    },
  });
};

// Create the store instance (optional: used outside of SSR)
export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
