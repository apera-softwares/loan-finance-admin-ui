import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  pageTitle:string;
  searchText:string;

}

const initialState: AppState = {
    pageTitle:"Dashboard",
    searchText:"",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {

    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },

  },

});

export const {setPageTitle,setSearchText} = appSlice.actions;

export default appSlice.reducer;
