import React from "react";
import { useRoutes } from "react-router-dom";
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
import SubRelatorios from "./views/dap/Relatorios";

const IsAuthenticated = () => {
  const token = useSelector((state) => state.login.isAuthenticated);
  return !!token;
};

const routes = [
  {
    path: "/",
    name: "Home",
    element: IsAuthenticated ? <Home to="/" /> : <Navigate to="/login" />,
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
    path: "/",
    name: "Home",
    element: IsAuthenticated ? <Home to="/" /> : <Navigate to="/login" />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: IsAuthenticated ? (
      <Dashboard to="/dashboard" />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/recrutamento",
    name: "Recrutamento",
  },
  {
    path: "/recrutamento/subRecrutamento",
    name: "SubRecrutamento",
    element: IsAuthenticated ? (
      <SubRecrutamento to="/recrutamento/subRecrutamento" />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/recrutamento/subRecrutamento2",
    name: "SubRecrutamento2",
    element: IsAuthenticated ? (
      <SubRecrutamento2 to="/recrutamento/subRecrutamento2" />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/trafego",
    name: "Tráfego",
  },
  {
    path: "/trafego/subTrafego",
    name: "SubTrafego",
    element: IsAuthenticated ? (
      <SubTrafego to="/trafego/subTrafego" />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/dap",
    name: "DAP",
  },
  {
    path: "/dap/relatorios",
    name: "Relatórios",
    element: IsAuthenticated ? (
      <SubRelatorios to="/dap/relatorios" />
    ) : (
      <Navigate to="/login" />
    ),
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
    element: IsAuthenticated ? <User to="/user" /> : <Navigate to="/login" />,
  },
  {
    path: "/user/create",
    name: "User Create",
    element: IsAuthenticated ? (
      <UserList to="/user" />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/user/list",
    name: "User List",
    element: IsAuthenticated ? (
      <UserList to="/user" />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/teste",
    name: "Teste",
    element: IsAuthenticated ? <Teste to="/teste" /> : <Navigate to="/login" />,
  },

  {
    path: "/adicionaritens",
    name: "AddItem",
    element: IsAuthenticated ? (
      <AddItem to="/adicionaritens" />
    ) : (
      <Navigate to="/login" />
    ),
  },
];

export const RoutesContext = React.createContext(routes);
export const RoutesElement = () => {
  return useRoutes(routes);
};
