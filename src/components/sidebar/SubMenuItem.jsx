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
        minWidth: "0",
        width: "50%",
        maxWidth: "50px",
        height: "5%",
      }}
    />
  );
};

const SubMenuItem = ({ subItem, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const listItemStyles = {
    pl: 8,
    background: colors.primary[400],
  };

  const hoverStyles = {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  };

  const lineStyles = {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    background: "#ffffff",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease",
  };

  const lineHoverStyles = {
    transform: "scaleX(1)",
  };

  const lineActiveStyles = {
    transform: "scaleX(1)",
    background: "green",
  };

  const controls = useAnimation();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(location.pathname === subItem.route);
  }, [location.pathname, subItem.route]);

  const handleHoverStart = () => {
    if (!isActive) {
      controls.start(lineHoverStyles);
    }
  };

  const handleHoverEnd = () => {
    if (!isActive) {
      controls.start({ transform: "scaleX(0)" });
    }
  };

  useEffect(() => {
    if (!isActive) {
      controls.set({ transform: "scaleX(0)" });
    } else {
      controls.set(lineActiveStyles);
    }
  }, [isActive, controls]);

  return (
    <motion.div
      whileHover={hoverStyles}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <ListItemButton key={subItem.id} sx={listItemStyles} onClick={onClick}>
        <ListItemIcon>
          <IconComponent iconName={subItem.icon} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            fontSize: "12px",
            lineHeight: "1",
            color: colors.grey[100],
          }}
          primary={subItem.text}
        />
        <motion.div
          style={{
            ...lineStyles,
            ...(isActive ? lineActiveStyles : {}),
          }}
          initial={isActive ? lineActiveStyles : { transform: "scaleX(0)" }}
          animate={controls}
        />
      </ListItemButton>
    </motion.div>
  );
};

export default SubMenuItem;
