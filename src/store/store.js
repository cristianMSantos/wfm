import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/Login'
import userReducer from './features/User'

export default configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer
  },
})