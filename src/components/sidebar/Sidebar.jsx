import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Navigate, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { setMenu } from "../../store/features/Menu";
import Collapse from "@mui/material/Collapse";
import { tokens } from "../../theme";

import Logo from "./Logo";
import MenuItem from "./MenuItem";
import SubMenuItem from "./SubMenuItem";
import { useMenu, generateInitialOpenState, handleClick } from "./sidebarUtils";
import {
  LogoContainer,
  ListSubheaderStyled,
  DrawerPaperStyled,
  ListItemButtonStyled,
  ListItemStyled,
} from "./Sidebar.styles";
import EditorItem from "../cadastroMenu/editorItem";
import SwipeableTemporaryDrawer from "../Swipeable";
import { setLogout } from "../../store/features/Login";

const Sidebar = ({ open, onClose, sidebarWidth }) => {
  const { menuItems, error } = useMenu();
  const sections = Array.from(
    new Set(menuItems?.map((menuItem) => menuItem.section))
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openIcons, setOpenIcons] = useState({});
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 900px)').matches)
  const appBarControl = useSelector((state) => state.sidebarControl.appBar)
  const [drawerRight, setDrawerRight] = useState(false);

  useEffect(() => {
    const initialOpenState = generateInitialOpenState(menuItems);
    setOpenIcons(initialOpenState);
  }, [menuItems]);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.matchMedia('(max-width: 900px)').matches);
    };


    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])

  const handleClickMenuItem = (item, subItem) => {
    handleClick(item, subItem, setOpenIcons, setSelectedRoute, menuItems);
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const toggleDrawerRight = (event) => {
    setDrawerRight(event)
    onClose()
  }

  const handleLogout = async () => {
    await dispatch(setLogout())
    navigate('/login')
  }

  const renderSwipeable = (
    <SwipeableTemporaryDrawer onSidebarToggle={toggleDrawerRight} open={drawerRight} />
  )

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Drawer
        open={open}
        onClose={onClose}
        variant={isMobile || appBarControl === 'static' ? 'temporary' : "permanent"}
        sx={{
          width: isMobile ? 'unset' : sidebarWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? 'unset' : sidebarWidth,
            boxSizing: "border-box",
            backgroundColor: colors.primary[500],
            color: colors.grey[100],
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.35) !important",
          },
        }}
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        component={DrawerPaperStyled}
        sidebarWidth={isMobile ? 0 : sidebarWidth}
        colors={colors}
      >
        {selectedRoute && <Navigate to={selectedRoute} replace={true} />}
        <LogoContainer
          onClick={() => handleClickMenuItem("logo", null)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <Logo />
        </LogoContainer>
        <List sx={{ padding: 0 }}>
          {menuItems &&
            sections.map((section) => (
              <React.Fragment key={section}>
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ListSubheaderStyled colors={colors}>
                    {section}
                  </ListSubheaderStyled>
                </motion.li>
                {menuItems.map((menuItem) => {
                  if (menuItem.section === section) {
                    return (
                      <MenuItem
                        key={menuItem.id}
                        menuItem={menuItem}
                        openIcons={openIcons}
                        colors={colors}
                        onClick={handleClickMenuItem}
                        onClickSubItem={handleClickMenuItem}
                        component={ListItemButtonStyled}
                        ListItemComponent={ListItemStyled}
                      />
                    );
                  }
                  return null;
                })}
              </React.Fragment>
            ))}
        </List>
        <EditorItem></EditorItem>
        {
          isMobile ?
            <List style={{ marginTop: "auto" }}>
              <ListItemButton onClick={() => toggleDrawerRight(true)}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Personalizar Sistema</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Perfil</ListItemText>
              </ListItemButton>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sair</ListItemText>
              </ListItemButton>
            </List> : false
        }
      </Drawer>
      {renderSwipeable}
    </div>
  );
};

export default Sidebar;
