import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { tokens } from "../theme";

const Topbar = ({ sidebarOpen, onSidebarToggle, onSidebarClose, sidebarWidth }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleSidebarToggle = () => {
        if (sidebarOpen) {
            onSidebarClose(); // Call onSidebarClose if the sidebar is open
        } else {
            onSidebarToggle(); // Call onSidebarToggle if the sidebar is closed
        }
    };

    const CustomAppBar  = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${sidebarWidth}px)`,
            marginLeft: `${sidebarWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    return (
        <CustomAppBar  position="fixed" open={sidebarOpen} sx={{
            backgroundColor: colors.primary[500],
            // boxShadow: "none",
            backgroundImage: "unset",
            borderBottom:'1px solid rgba(255, 255, 255, 0.12)',
            height:"12%"
           }}>
            <Toolbar>
                <IconButton color="inherit" edge="start" onClick={handleSidebarToggle} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Persistent drawer
                </Typography>
            </Toolbar>
        </CustomAppBar >
    );
};

export default Topbar;
