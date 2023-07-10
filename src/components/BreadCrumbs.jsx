import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Navigate, Link as RouterLink, Routes, useLocation, useNavigate, useResolvedPath } from "react-router-dom";
import { Typography } from "@mui/material";
import { RoutesContext } from "../routes";

export default function BreadCrumbs() {
    const routes = useContext(RoutesContext);
    const navigate = useNavigate()
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbNameMap = {};

    routes.map(e => {
        breadcrumbNameMap[e.path] = e.name
    })

    function handleClick(event, to) {
        event.preventDefault()
        console.log('handleClick')
        console.log(to)
        navigate(to)
    }

    function LinkRouter(props) {
        return <Link {...props} component={RouterLink} />;
    }

    return (
        <div role="presentation" >
            <Breadcrumbs aria-label="breadcrumb">
                {/* <LinkRouter underline="hover" color="inherit" to="/">
                    Home
                </LinkRouter> */}
                {pathnames.length <= 0 ? (
                    <Typography color="inherit">
                        Home
                    </Typography>
                ) : null}

                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;


                    return last ? (
                        <Typography color="text.primary" key={to}>
                            {breadcrumbNameMap[to]}
                        </Typography>
                    ) : (
                         <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                            {breadcrumbNameMap[to]}
                        </LinkRouter>
                    );

                  
                })}
            </Breadcrumbs>
        </div>
    )
}