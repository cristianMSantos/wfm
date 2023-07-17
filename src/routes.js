import React from "react";
import { Outlet, Route, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Home from "./views/Home";
import User from "./views/User";
import UserList from "./views/UserList";
import Teste from "./views/Teste";
import AddItem from "./views/AddItem/AddItem";
import Dashboard from "./views/Dashboard";
import SubRecrutamento from "./views/recrutamento/SubRecrutamento";
import SubRecrutamento2 from "./views/recrutamento/SubRecrutamento2";
import SubTrafego from "./views/trafego/SubTrafego";
import Login from "./views/Login";
import Acessos from "./views/admin/Acessos";
import ProtectedRoute from "./ProtectedRoute";

// const ProtectedRoute = ({
//   perfilNecessario,
//   redirectPath = '/',
//   children,
// }) => {
//   const perfilUsuario = useSelector((state) => state.user.user);
//   console.log(perfilUsuario)

//   if (!perfilUsuario) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   if(perfilUsuario.co_perfil === perfilNecessario){
//     return children ? children : <Outlet />;
//   }

//   return children ? children : <Outlet />;

// };


const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home to="/" />,
  },
  // {
  //     path: "/user",
  //     name: 'User',
  //     children: [
  //         {
  //             path: "",
  //             element: <User to="user" replace />
  //         },
  //         {
  //             path: "create",
  //             element: <UserList />,
  //         },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard to="/dashboard" />
  },
  {
    path: "/recrutamento/subRecrutamento",
    name: "SubRecrutamento",
    element: <SubRecrutamento to="/recrutamento/subRecrutamento" />
  },
  {
    path: "/recrutamento/subRecrutamento2",
    name: "SubRecrutamento2",
    element: <SubRecrutamento2 to="/recrutamento/subRecrutamento2" />
  },
  {
    path: "/recrutamento",
    name: "Recrutamento",
  },
  {
    path: "/trafego",
    name: "Tráfego",
  },
  {
    path: "/trafego/subTrafego",
    name: "SubTrafego",
    element: <SubTrafego to="/trafego/subTrafego" />
  },
  // {
  //     path: "/user",
  //     name: 'User',
  //     children: [
  //         {
  //             path: "",
  //             element: <User to="user" replace />
  //         },
  //         {
  //             path: "create",
  //             element: <UserList />,
  //         },

  //     ],
  // },
  {
    path: "/user",
    name: "User",
    element: <User to="/user" />,
  },
  {
    path: "/user/create",
    name: "User Create",
    element: <UserList to="/user" />
  },
  {
    path: "/user/list",
    name: "User List",
    element: <UserList to="/user" />
  },
  {
    path: "/teste",
    name: "Teste",
    element: <Teste to="/teste" />,
  },

  {
    path: "/adicionaritens",
    name: "AddItem",
    element: <AddItem to="/adicionaritens" />
  },
  {
    path: "/acessos",
    name: "Acessos",
    element: (
      <ProtectedRoute
        perfilNecessario={1}
      >
        <Acessos />
      </ProtectedRoute>
    ),
  },
];

export const RoutesContext = React.createContext(routes);
export const RoutesElement = () => {
  return useRoutes(routes);
};
