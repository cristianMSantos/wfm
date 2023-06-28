import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Divider, Grid, ButtonGroup } from '@mui/material';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import PestControlIcon from '@mui/icons-material/PestControl';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled, useTheme, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux'
import { tokens } from "../theme";
import api from '../axios'
import { setUser } from '../store/features/User'
import BreadCrumbs from "./BreadCrumbs";
import SwipeableTemporaryDrawer from "./Swipeable";
import { ExpandLess, ExpandMore, ChevronRight, Person } from "@mui/icons-material";
import logo from "../assets/images/logo.png";
import { motion } from "framer-motion";
import { setOrientation } from "../store/features/SideBarControl";
import { useNavigate } from "react-router";
import { setLogout } from "../store/features/Login";
import { width } from "@mui/system";

const Topbar = ({ sidebarOpen, onSidebarToggle, onSidebarClose, sidebarWidth }) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const token = useSelector((state) => state.login.isAuthenticated)
    const user = useSelector((state) => state.user.user)
    const sidebarControl = useSelector((state) => state.sidebarControl.orientation)
    const appBarControl = useSelector((state) => state.sidebarControl.appBar)
    const colors = tokens(theme.palette.mode);

    const fullName = user ? user.nome : '';
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorNotification, setAnchorNotification] = React.useState(null);
    const openNotification = Boolean(anchorNotification);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [drawerRight, setDrawerRight] = useState(false);
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 900px)').matches)
    const menuItems = useSelector((state) => state.menu.list);
    const sections = menuItems
        .map((menuItem) => menuItem.section)
        .filter((value, index, self) => self.indexOf(value) === index);

    const [openMenus, setOpenMenus] = useState([]);

    const handleMenuTopOpen = (section) => {
        if (!openMenus.includes(section)) {
            setOpenMenus((prevOpenMenus) => [...prevOpenMenus, section]);
        }
    };

    const handleMenuTopClose = (section) => {
        setOpenMenus((prevOpenMenus) => prevOpenMenus.filter((menu) => menu !== section));
    };

    const handleClickNotification = (event) => {
        console.log(event.currentTarget)
        setAnchorNotification(event.currentTarget);
    };
    const handleCloseNotification = () => {
        setAnchorNotification(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const handleLogout = async () => {
        await dispatch(setLogout())
        navigate('/login')
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const toggleDrawerRight = (event) => {
        setDrawerRight(event)
        console.log(event)
    }

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
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sair</ListItemText>
            </MenuItem>
        </Menu>
    );

    const renderSwipeable = (
        <SwipeableTemporaryDrawer onSidebarToggle={toggleDrawerRight} open={drawerRight} />
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
                <ListItemIcon>
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </ListItemIcon>
                <ListItemText>Notificações</ListItemText>
            </MenuItem>
            <MenuItem >
                <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Perfil</ListItemText>
            </MenuItem>
            <MenuItem >
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sair</ListItemText>
            </MenuItem>
        </Menu>
    );

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('xs')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const renderMenuNotification = (
        <Menu
            anchorEl={anchorNotification}
            id="notification"
            open={openNotification}
            onClose={handleCloseNotification}
            onClick={handleCloseNotification}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Grid container sx={{ display: 'flex', alignItems: 'center', padding: theme.spacing(2), }}>
                <Grid item xs={12} md={12} sx={{ display: 'flex' }}>
                    <NotificationsIcon />
                    <Typography>Notificações</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container sx={{ display: 'flex', alignItems: 'center', paddingRight: theme.spacing(2), paddingLeft: theme.spacing(2), }}>
                <Grid item xs={12} md={12} sx={{ display: 'flex' }}>
                    <Button>
                        <Avatar>
                            <PestControlIcon />
                        </Avatar>
                        <Typography>Erro Corrigido!</Typography>
                    </Button>
                </Grid>
            </Grid>
            <Grid container sx={{ display: 'flex', alignItems: 'center', paddingRight: theme.spacing(2), paddingLeft: theme.spacing(2) }}>
                <Grid item xs={12} md={12} sx={{ display: 'flex' }}>
                    <Button>
                        <Avatar>
                            <Person />
                        </Avatar>
                        <Typography>Novo Usuário Cadastrado.</Typography>
                    </Button>
                </Grid>
            </Grid>

        </Menu>
    )

    useEffect(() => {
        const handleWindowResize = () => {
            setIsMobile(window.matchMedia('(max-width: 900px)').matches);
        };


        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    useEffect(() => {
        if (isMobile) {
            dispatch(setOrientation('vertical'))
        }
    }, [isMobile]);

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
            <AppBar position={appBarControl} open={sidebarOpen} sx={{
                width: `calc(100% - ${isMobile || appBarControl === 'static' ? 0 : sidebarWidth}px)`,
                height: '10%'

            }}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: colors.primary[500],
                        color: colors.grey[100],
                        width: '100%',
                        // boxShadow: "none",
                        backgroundImage: "unset",
                        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                        // height: sidebarControl === 'horizontal' ? 'auto' : '12%'
                        height: '100%'
                    }}
                >
                    {
                        sidebarControl === 'vertical' ?
                            <IconButton color="inherit" edge="start" onClick={handleSidebarToggle} sx={{}}>
                                <ViewSidebarOutlinedIcon sx={{ transform: 'scaleX(-1)' }} />
                            </IconButton> :
                            <motion.img
                                src={logo}
                                alt="Logo"
                                style={{ width: "10%", marginRight: '20px' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />

                    }
                    <BreadCrumbs />

                    <Box sx={{ flexGrow: 1 }} />
                    {
                        !isMobile ?
                            <Search sx={{ mr: 4 }}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{
                                        'aria-label': 'search',
                                        endadornment: (
                                            <InputAdornment position="end">⌘/</InputAdornment>
                                        ),
                                    }}
                                />
                            </Search> :
                            <IconButton size="large" aria-label="search" color="inherit">
                                <SearchIcon />
                            </IconButton>
                    }
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
                            onClick={() => toggleDrawerRight(true)}
                        >
                            <SettingsIcon />
                        </IconButton>
                        <IconButton
                            id='notification'
                            onClick={handleClickNotification}
                            aria-controls={openNotification ? 'notification' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openNotification ? 'true' : undefined}
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {renderMenuNotification}

                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            id='notification'
                            onClick={handleClickNotification}
                            aria-controls={openNotification ? 'notification' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openNotification ? 'true' : undefined}
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {renderMenuNotification}
                    </Box>
                </Toolbar>
                {

                    sidebarControl === 'horizontal' ?
                        <div>
                            {console.log(menuItems)}

                            <Box sx={{ display: 'flex', marginLeft: '15px' }}>
                                {sections.map((section) => (
                                    <React.Fragment key={section}>
                                        <Button
                                            id={section}
                                            aria-controls={openMenus.includes(section) ? section : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openMenus.includes(section) ? 'true' : undefined}
                                            onClick={() => handleMenuTopOpen(section)}
                                        >
                                            {section}
                                            {openMenus.includes(section) ? <ExpandLess /> : <ExpandMore />}
                                        </Button>
                                        <Menu
                                            key={section}
                                            id={section}
                                            anchorEl={openMenus.includes(section) ? document.getElementById(section) : null}
                                            open={openMenus.includes(section)}
                                            onClose={() => handleMenuTopClose(section)}
                                            MenuListProps={{
                                                'aria-labelledby': section,
                                            }}>
                                            <ButtonGroup orientation="vertical" sx={{backgroundColor: 'transparent'}}>

                                                {
                                                    menuItems
                                                        .filter((menu) => menu.section === section)
                                                        .map((menu) => {

                                                            return menu.hasSubItems ?
                                                                <div>

                                                                    <Button
                                                                        sx={{width: '100%', mb:1}}
                                                                        id={`${menu.id}-button`}
                                                                        aria-controls={`${menu.id}-menu`}
                                                                        aria-haspopup="true"
                                                                        aria-expanded={openMenus.includes(menu.id) ? 'true' : undefined}
                                                                        onClick={() => handleMenuTopOpen(menu.id)}
                                                                    >
                                                                        {menu.id}
                                                                        <Box sx={{flexGrow: 1}}></Box>
                                                                        {openMenus.includes(menu.id) ? <ChevronRight /> : <ExpandMore />}
                                                                    </Button>
                                                                    <Menu
                                                                        id={`${menu.id}-menu`}
                                                                        aria-labelledby={`${menu.id}-button`}
                                                                        anchorEl={openMenus.includes(menu.id) ? document.getElementById(`${menu.id}-button`) : null}
                                                                        open={openMenus.includes(menu.id)}
                                                                        onClose={() => handleMenuTopClose(menu.id)}
                                                                        anchorOrigin={{
                                                                            vertical: 'center',
                                                                            horizontal: 'right',
                                                                        }}
                                                                        transformOrigin={{
                                                                            vertical: 'top',
                                                                            horizontal: 'left',
                                                                        }}
                                                                    >
                                                                        {menu.subItems.map((subItem) => (
                                                                            <MenuItem key={subItem.text} onClick={() => handleMenuTopClose(subItem.text)}>
                                                                                {subItem.text}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Menu>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <Button
                                                                        id={menu.id}
                                                                        aria-controls={'demo-positioned-menu'}
                                                                        aria-haspopup="true"
                                                                        aria-expanded={'true'}

                                                                    >
                                                                        {menu.id}
                                                                    </Button>
                                                                </div>

                                                        })
                                                }
                                            </ButtonGroup>
                                        </Menu>

                                    </React.Fragment>
                                ))}
                            </Box>
                        </div> : false
                }
            </AppBar>
            {/* {renderMobileMenu} */}
            {renderMenu}
            {renderSwipeable}
        </Box>
    );
};

export default Topbar;
