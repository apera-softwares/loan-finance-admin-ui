import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import userManagementReducer from './slices/userManagementSlice'


const rootReducer = combineReducers({
  user: userReducer,
  userManagement: userManagementReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>
export default rootReducer
