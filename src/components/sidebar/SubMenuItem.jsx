import React, { useEffect, useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import * as Icons from "@mui/icons-material";
import { motion, useAnimation } from "framer-motion";
import { styled, useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useLocation } from "react-router-dom";

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

const SubMenuItem = ({ subItem, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const listItemStyles = {
    pl: 8,
  };

  const controls = useAnimation();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  return (
    <ListItemButton
      key={subItem.id}
      onClick={onClick}
      sx={{ width: "100%", paddingLeft: "45px" }}
    >

      <IconComponent iconName={subItem.icon} />
      <ListItemText
        primaryTypographyProps={{
          fontSize: "12px",
          lineHeight: "1",
        }}
        primary={subItem.text}
      />
    </ListItemButton>
  );
};

export default SubMenuItem;
