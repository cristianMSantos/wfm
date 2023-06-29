import React from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Home from "./views/Home";
import User from "./views/User";
import UserList from "./views/UserList";
import Teste from "./views/Teste";
import AddItem from "./views/AddItem/AddItem";
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
