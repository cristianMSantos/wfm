import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/Login'
import userReducer from './features/User'
import menuReducer from './features/Menu'
import sideBarControlReducer from './features/SideBarControl'

export default configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    menu: menuReducer,
    sidebarControl: sideBarControlReducer
  },
})