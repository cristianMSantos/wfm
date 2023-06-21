import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, List } from "@mui/material";
import { Navigate } from "react-router-dom";
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

const Sidebar = ({ open, onClose, sidebarWidth }) => {
  const { menuItems, error } = useMenu();
  const sections = Array.from(
    new Set(menuItems?.map((menuItem) => menuItem.section))
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const [openIcons, setOpenIcons] = useState({});
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    const initialOpenState = generateInitialOpenState(menuItems);
    setOpenIcons(initialOpenState);
  }, [menuItems]);

  const handleClickMenuItem = (item, subItem) => {
    handleClick(item, subItem, setOpenIcons, setSelectedRoute, menuItems);
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Drawer
      open={true}
      onClose={onClose}
      variant="persistent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
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
      sidebarWidth={sidebarWidth}
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
    </Drawer>
  );
};

export default Sidebar;
