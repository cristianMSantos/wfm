import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Menu } from '@mui/material';

const Sidebar = ({ open, onClose, sidebarWidth }) => {
    const theme = useTheme();
    return (
        <Drawer
            open={open}
            onClose={onClose}
            variant="persistent"
            style={{backgroundColor: theme.palette.primary.main}}
            sx={{
                width: sidebarWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: sidebarWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <Menu />
                    </ListItemIcon>
                    <ListItemText primary="Menu Item 1" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Menu />
                    </ListItemIcon>
                    <ListItemText primary="Menu Item 2" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
