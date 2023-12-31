import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/Login";
import userReducer from "./features/User";
import menuReducer from "./features/Menu";
import sideBarControlReducer from "./features/SideBarControl";
import temaControlReducer from "./features/TemaControl";
import relatoriosReducer from "./features/dap/Relatorios";

export default configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    menu: menuReducer,
    sidebarControl: sideBarControlReducer,
    temaControl: temaControlReducer,
    relatorios: relatoriosReducer,
  },
});
