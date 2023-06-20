import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import ItemChanger from "../cadastroMenu/ItemChanger";

const sidebarFooter = () => {
  return (
    <List style={{ marginTop: "auto" }}>
      <ListItem>
        <ListItemText>
          <ItemChanger /> {/* Render the User component */}
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default sidebarFooter;
