import React from "react";
import { motion } from "framer-motion";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { tokens } from "../../theme";
import { styled, useTheme } from "@mui/material/styles";
import SubMenuItem from "./SubMenuItem";


const MenuItem = ({ menuItem, openIcons, onClick, onClickSubItem }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const listItemButtonStyles = {
    padding: "4px 16px",
    position: "relative",
  };

  const IconComponent = ({ iconName }) => {
    const Icon = Icons[iconName];
    return (
      <Icon
        sx={{
          minWidth: '1.2em',
          minHeight: '1.2em',
          marginRight: '.5rem'
        }}
      />
    );
  };

  const handleClick = (itemId) => {
    const isOpen = openIcons?.[itemId];
    if (menuItem.hasSubItems && !isOpen) {
      // Opening an item with subitems, close all others first
      onClick(itemId);
    } else {
      onClick(itemId);
    }
  };

  // Get the current location URL
  const currentLocation = window.location.pathname;

  const isCurrentLocation = (url) => {
    // Check if the current location matches the provided URL
    console.log(currentLocation === url);
    return currentLocation === url;
  };

  return (
    <>
      <ListItemButton onClick={() => handleClick(menuItem.id)}>
        {menuItem.hasSubItems &&
          (openIcons?.[menuItem.id] ? (
            <Icons.ExpandLess
              sx={{
                minWidth: 0,
              }}
            />
          ) : (
            <Icons.ChevronRight
              sx={{
                minWidth: 0,
              }}
            />
          ))}

        <IconComponent iconName={menuItem.icon} />
        <ListItemText
          primaryTypographyProps={{
            lineHeight: "1",
          }}
          primary={menuItem.text}
        />
      </ListItemButton>

      {menuItem.hasSubItems && (
        <Collapse in={openIcons?.[menuItem.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menuItem.subItems.map((subItem) => (
              <SubMenuItem
                key={subItem.id}
                subItem={subItem}
                onClick={() => onClickSubItem(menuItem.id, subItem)}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default MenuItem;
