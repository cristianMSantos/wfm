import React, { useContext, useEffect } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink, Routes, useLocation, useResolvedPath } from "react-router-dom";
import { Typography } from "@mui/material";
import { RoutesContext } from "../routes";

export default function BreadCrumbs() {
    const routes = useContext(RoutesContext);
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbNameMap = {};

    routes.map(e => {
        breadcrumbNameMap[e.path] = e.name
    })

    useEffect(() => {
        console.log(routes)
    }, [])

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    function LinkRouter(props) {
        return <Link {...props} component={RouterLink} />;
    }

    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <LinkRouter underline="hover" color="inherit" href="/">
                    Home
                </LinkRouter>
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