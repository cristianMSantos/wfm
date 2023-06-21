import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import { styled, useTheme } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { Menu } from '@mui/material';
import { tokens } from '../theme';
import Box from '@mui/material/Box';
import logo from '../assets/images/logo.png';

import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';


// INSIRA UM NOVO ÍCONE AQUI!!!!!!!!!!!!!!!!!!!
const menuItems = [
    {
      id: 'dashboard',
      icon: <DashboardOutlinedIcon />,
      text: 'Dashboard',
      hasSubItems: false,
      route: '/',
      section: 'Ferramentas',
    },
    {
      id: 'recrutamento',
      icon: <AssignmentIndOutlinedIcon />,
      text: 'Recrutamento',
      hasSubItems: true,
      subItems: [
        {
          id: 'recrutamento-teste',
          icon: <StarBorder />,
          text: 'Starred',
          route: '/user',
        },
      ],
      section: 'Departamentos',
    },
    {
      id: 'trafego',
      icon: <DataThresholdingOutlinedIcon />,
      text: 'Tráfego',
      hasSubItems: true,
      subItems: [
        {
          id: 'trafego-teste',
          icon: <StarBorder />,
          text: 'Starred',
          route: '/user',
        },
      ],
      section: 'Departamentos',
    },
    {
      id: 'user',
      icon: <DataThresholdingOutlinedIcon />,
      text: 'Usuário',
      hasSubItems: true,
      subItems: [
        {
          id: 'user-list',
          icon: <StarBorder />,
          text: 'Lista',
          route: '/user/list',
        },
        {
          id: 'user-create',
          icon: <StarBorder />,
          text: 'Criação',
          route: '/user/create',
        },
        {
          id: 'user',
          icon: <StarBorder />,
          text: 'Index',
          route: '/user',
        },
      ],
      section: 'Departamentos',
    },
  ];
  

  // Prepara dinamicamente o estado dos menus que possuem expansão para false -> aplicado no useState
  function generateInitialOpenState() {
    const initialOpenState = {};
    menuItems.forEach((menuItem) => {
      if (menuItem.hasSubItems) {
        initialOpenState[menuItem.id] = false;
      }
    });
    return initialOpenState;
  }

const Sidebar = ({ open, onClose, sidebarWidth }) => {
    const sections = Array.from(new Set(menuItems.map((menuItem) => menuItem.section)));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Carrega a paleta de cores para utilização conforme tema

  const [openIcons, setOpenIcons] = useState(generateInitialOpenState());
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleClick = (item, subItem = null) => {
    if (item === 'logo') {
        setSelectedRoute('/');
        return;
      }
    
    if (subItem) {
      // Handle sub-item click
      if (subItem.route) {
        setSelectedRoute(subItem.route);
      } else {
        setSelectedRoute(null);
      }
    } else {
      // Handle main menu item click
      setOpenIcons((prevOpenIcons) => ({
        ...prevOpenIcons,
        [item]: !prevOpenIcons[item],
      }));
  
      const menuItem = menuItems.find((menuItem) => menuItem.id === item);
      if (menuItem && menuItem.route) {
        setSelectedRoute(menuItem.route);
      } else {
        setSelectedRoute(null);
      }
    }
  };
  

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant="persistent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          // backgroundColor: colors.primary[500],
          // color: colors.grey[100],
        },
      }}
    >
      {selectedRoute && <Navigate to={selectedRoute} replace={true} />}
      <Box
        sx={{
          width: '100%',
          height: '12%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          cursor: 'pointer',
        }}
        onClick={() => handleClick('logo')}
      >
        <img src={logo} alt="Logo" style={{ width: '80%', height: '80%' }} />
      </Box>
      <List sx={{ padding: 0 }}>
        {sections.map((section) => (
          <React.Fragment key={section}>
            <ListSubheader
              sx={{
                backgroundColor: 'transparent',
                fontSize: '12px',
                lineHeight: '1.2',
                paddingTop: '12px',
                paddingBottom: '4px',
                textAlign: 'left',
                // color: colors.grey[100],
              }}
            >
              {section}
            </ListSubheader>
            {menuItems.map((menuItem) => {
              if (menuItem.section === section) {
                return (
                  <React.Fragment key={menuItem.id}>
                    
                    <ListItemButton
                      sx={{ padding: '4px 26px' }}
                      onClick={() => handleClick(menuItem.id)}
                    >
                        {menuItem.hasSubItems &&
                        (openIcons[menuItem.id] ? <ExpandLess sx={{ minWidth: '0', width:'15%', height:'5%', color: colors.grey[100]}} /> : <ChevronRightIcon  sx={{ minWidth: '0', width:'15%', height:'5%'}}/>)}
                      <ListItemIcon sx={{ minWidth: '0', width:'10%', height:'5%', marginRight: '16px'}}>
                        {menuItem.icon}
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: '12px', lineHeight: '1' }}
                        primary={menuItem.text}
                      />
                    </ListItemButton>
                    {menuItem.hasSubItems && (
                      <Collapse in={openIcons[menuItem.id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {menuItem.subItems.map((subItem) => (
                            <ListItemButton
                              key={subItem.id}
                              sx={{ pl: 6 }}
                              onClick={() => handleClick(menuItem.id, subItem)}
                            >
                              <ListItemIcon sx={{ minWidth: '0', width:'10%', height:'5%', marginRight: '16px'  }}>
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText
                                primaryTypographyProps={{ fontSize: '12px', lineHeight: '1' }}
                                primary={subItem.text}
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </React.Fragment>
                );
              }
              return null;
            })}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
