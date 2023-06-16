import React from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

import Home from './views/Home';
import User from './views/User';
import UserList from "./views/UserList";

const IsAuthenticated = () => {
    const token = useSelector((state) => state.login.isAuthenticated)
    return !!token;
}


const routes = [
    {
        path: "/",
        name: 'Home',
        element: IsAuthenticated ? <Home to="/" /> : <Navigate to="/login" />,
    },
    {
        path: "/user",
        name: 'User',
        element: IsAuthenticated ? <User to="/user" /> : <Navigate to="/login" />,
    },
    {
        path: "/user/list",
        name: 'User List',
        element: IsAuthenticated ? <UserList to="/user" /> : <Navigate to="/login" />,
    },
]

export const RoutesContext = React.createContext(routes);
export const RoutesElement = () => {
    return useRoutes(routes)
}
