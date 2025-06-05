import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import userManagementReducer from './slices/userManagementSlice'
import productCatalogReducer from "./slices/productCatalogSlice";
import teamManagementReducer from './slices/teamManagementSlice'
import userProfileReducer from './slices/loginPersonProfile'
import memberManagementReducer from './slices/membersSlice'
import referralReducer from "./slices/referralSlice"
import salesRepresentativeReducer from "./slices/salesRepresentativeSlice";



const rootReducer = combineReducers({
  user: userReducer,
  userManagement: userManagementReducer,
  productCatalog:productCatalogReducer,
  teamManagement: teamManagementReducer,
  userProfile: userProfileReducer,
  memberManagement:memberManagementReducer,
  referral:referralReducer,
  salesRepresentative:salesRepresentativeReducer,
})

export type RootReducer = ReturnType<typeof rootReducer> ;
export default rootReducer ;
