import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux'
import { tokens } from "../theme";
import api from '../axios'
import { setUser } from '../store/features/User'

const Topbar = ({ sidebarOpen, onSidebarToggle, onSidebarClose, sidebarWidth }) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const token = useSelector((state) => state.login.isAuthenticated)
    const user = useSelector((state) => state.user.user)
    const colors = tokens(theme.palette.mode);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        const options = {
            url: `/auth/me`,
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: token ? `Bearer ${token}` : '',
            }
        }
        return await api(options)
            .then((response) => {
                dispatch(setUser(response.data))
            })
            .catch((error) => {
                console.error('Erro ao buscar o usuário:', error.response);
            })
    }

    const handleSidebarToggle = () => {
        if (sidebarOpen) {
            onSidebarClose(); // Call onSidebarClose if the sidebar is open
        } else {
            onSidebarToggle(); // Call onSidebarToggle if the sidebar is closed
        }
    };

    const CustomAppBar = styled(MuiAppBar, {
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
        <CustomAppBar position="fixed" open={sidebarOpen} sx={{
            backgroundColor: colors.primary[500],
            // boxShadow: "none",
            backgroundImage: "unset",
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            height: "12%"
        }}>
            <Toolbar>
                <IconButton color="inherit" edge="start" onClick={handleSidebarToggle} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {user ? user.nome : ''}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="show settings"
                        color="inherit"
                    >
                        <SettingsIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </CustomAppBar >
    );
};

export default Topbar;
