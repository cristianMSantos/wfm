import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/Login";
import menuReducer from "./features/Menu";
import relatoriosReducer from "./features/dap/Relatorios";
import sideBarControlReducer from "./features/SideBarControl";
import temaControlReducer from "./features/TemaControl";
import userReducer from "./features/User";

export default configureStore({
  reducer: {
    login: loginReducer,
    menu: menuReducer,
    relatorios: relatoriosReducer,
    sidebarControl: sideBarControlReducer,
    temaControl: temaControlReducer,
    user: userReducer,
  },
});
