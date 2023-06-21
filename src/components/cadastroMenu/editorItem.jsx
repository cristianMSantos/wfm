import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogComponent from "./DialogComponent";

const EditorItem = () => {
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  // Retrieve the menu.list from the store
  const menuList = useSelector((state) => state.menu.list);
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <IconButton aria-label="delete" size="small" onClick={handleOpenDialog}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>

      <DialogComponent
        menuList={menuList}
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default EditorItem;