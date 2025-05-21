import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import userManagementReducer from './slices/userManagementSlice'
import productCatalogReducer from "./slices/productCatalogSlice";
import teamManagementReducer from './slices/teamManagementSlice'


const rootReducer = combineReducers({
  user: userReducer,
  userManagement: userManagementReducer,
  productCatalog:productCatalogReducer,
  teamManagement: teamManagementReducer,
})

export type RootReducer = ReturnType<typeof rootReducer> ;
export default rootReducer ;
