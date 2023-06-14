import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/Login'

export default configureStore({
  reducer: {
    login: loginReducer
  },
})