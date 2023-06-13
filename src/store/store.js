import { configureStore } from '@reduxjs/toolkit'
import login from './features/Login'

export default configureStore({
  reducer: {
    isAuthenticated: login
  },
})