import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, AvatarGroup, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material';
import { ColorModeContext } from '../theme';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrientation } from '../store/features/SideBarControl';


export default function SwipeableTemporaryDrawer({ onSidebarToggle, open }) {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext)
    const [mode, setMode] = React.useState('dark');
    const sidebarControl = useSelector((state) => state.sidebarControl.orientation)
    const [colorPrimary, setColorPrimary] = React.useState('blue');
    const dispatch = useDispatch()
    const [menu, setMenu] = React.useState('vertical');
    const [bar, setBar] = React.useState('fixed');


    useEffect(() => {
        setMode(mode);
    }, [])

    useEffect(() => {
        setMenu(sidebarControl)
    }, [sidebarControl])

    const handleClick = (open) => (event) => {
        onSidebarToggle(open)
    }

    const handleChangeMode = (event) => {
        setMode(event.target.value);
        colorMode.toggleColorMode()
        // console.log('handleChangeMode')
    };

    const handleChangeColorPrimary = (color) => {
        setColorPrimary(color);
        colorMode.toggleComponentMode(color)
        // console.log(color)
    };

    const handleChangeMenu = (event) => {
        setMenu(event.target.value)
        dispatch(setOrientation(event.target.value))

        // console.log(event.target.value)
    }
   
    const handleChangeBar = (event) => {
        setBar(event.target.value)
        // dispatch(setOrientation(event.target.value))

        // console.log(event.target.value)
    }

    const list = () => (
        <Box
            sx={{
                width: 250,
                backgroundColor: theme.palette.mode,
                ...theme.typography.fontSize,
                color: theme.palette.mode,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
            role="presentation"
        //   onKeyDown={handleClick(false)}
        >
            <Grid container sx={{ display: 'flex', alignItems: 'center', padding: theme.spacing(2), }}>
                <Grid item xs={10} md={10}>
                    <Typography>Personalizar Sistema</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                    <IconButton aria-label='close' onClick={handleClick(false)} edge="end">
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider />
            <Grid container sx={{ display: 'flex', alignItems: 'center', padding: theme.spacing(2), }}>
                <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} md={12}>
                        <Typography>Modo</Typography>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="mode"
                                name="mode-group"
                                value={mode}
                                onChange={handleChangeMode}
                            >
                                <FormControlLabel value="dark" control={<Radio />} label="Escuro" />
                                <FormControlLabel value="light" control={<Radio />} label="Claro" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
            <Grid container sx={{ display: 'flex', alignItems: 'center', padding: theme.spacing(2), }}>
                <Grid item xs={12} md={12}>
                    <Typography>Temas</Typography>
                    <AvatarGroup
                        variant="rounded"
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Avatar sx={{ bgcolor: '#004AAD', mr: 2 }}>
                            <Button sx={{ width: '100%', height: '100%' }} onClick={() => handleChangeColorPrimary('blue')}>
                                {colorPrimary === 'blue' ? <CheckIcon sx={{ color: 'white' }} /> : ''}
                            </Button>
                        </Avatar>
                        <Avatar sx={{ bgcolor: '#FD6809', mr: 2 }}>
                            <Button sx={{ width: '100%', height: '100%' }} onClick={() => handleChangeColorPrimary('orange')}>
                                {colorPrimary === 'orange' ? <CheckIcon sx={{ color: 'white' }} /> : ''}
                            </Button>
                        </Avatar>
                        <Avatar sx={{ bgcolor: '#716F70', mr: 2 }}>
                            <Button sx={{ width: '100%', height: '100%' }} onClick={() => handleChangeColorPrimary('grey')}>
                                {colorPrimary === 'grey' ? <CheckIcon sx={{ color: 'white' }} /> : ''}
                            </Button>
                        </Avatar>
                    </AvatarGroup>
                </Grid>
            </Grid>
            <Divider />
            <Grid container sx={{ display: 'flex', alignItems: 'center', padding: theme.spacing(2), }}>
                <Grid item xs={12} md={12}>
                    <Typography>Menu</Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="menu"
                            name="menu-group"
                            value={menu}
                            onChange={handleChangeMenu}
                        >
                            <FormControlLabel value="vertical" control={<Radio />} label="Vertical" />
                            <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Divider />
            <Grid container sx={{ display: 'flex', alignItems: 'center', padding: theme.spacing(2), }}>
                <Grid item xs={12} md={12}>
                    <Typography>Barra de Navegação</Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="bar"
                            name="bar-group"
                            value={bar}
                            onChange={handleChangeBar}
                        >
                            <FormControlLabel value="estatic" control={<Radio />} label="Estático" />
                            <FormControlLabel value="fixed" control={<Radio />} label="Fixa" />
                            <FormControlLabel value="hide" control={<Radio />} label="Esconder" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <div>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <SwipeableDrawer
                anchor='right'
                open={open}
                onClose={handleClick(false)}
                onOpen={handleClick(true)}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}