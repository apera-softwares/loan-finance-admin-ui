import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import userManagementReducer from './slices/userManagementSlice'
import teamManagementReducer from './slices/teamManagementSlice'


const rootReducer = combineReducers({
  user: userReducer,
  userManagement: userManagementReducer,
  teamManagement: teamManagementReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>
export default rootReducer
