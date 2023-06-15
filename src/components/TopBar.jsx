import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
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

    const fullName = user ? user.nome : '';
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/* <Divider /> */}
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Perfil</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sair</ListItemText>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
        </Menu>
    );

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

    return (
        <Box>
            <AppBar position="fixed" open={sidebarOpen} sx={{
                display: 'flex',
                justifyContent: 'center',
                width: `calc(100% - ${sidebarWidth}px)`,
                backgroundColor: colors.primary[500],
                color: colors.grey[100],
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
                        Home
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar sx={{ mr: 1 }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            <Typography variant="h6" noWrap component="div">
                                {user ? `${firstName} ${lastName}` : ''}
                            </Typography>
                        </Button>
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
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};

export default Topbar;
