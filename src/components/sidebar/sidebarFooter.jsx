import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";


const sidebarFooter = () => {
  return (
    <List style={{ marginTop: "auto" }}>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Perfil</ListItemText>
      </ListItemButton>
    </List>
  );
};

export default sidebarFooter;
