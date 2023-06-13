import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

export default function NavBar(props) {
    const theme = useTheme();

    React.useEffect(() => {
        console.log(`${props.drawerWidth} - genti`);
    }, [props.drawerWidth]);

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${props.drawerWidth}px)`,
            marginLeft: `${props.drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    function handleClick() {
        // Chama a função do componente pai
        props.handleDrawerOpen();
    }

    return (
        <div>
            <AppBar position="fixed" open={props.open} style={{ backgroundColor: theme.palette.primary.main }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleClick}
                        edge="start"
                        sx={{ mr: 2, ...(props.open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}