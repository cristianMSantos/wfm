import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import CadastrarMenu from "./CadastrarMenu";
import EditarMenu from "./EditarMenu";

const DialogComponent = ({ menuList, open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Cadastrar Menu" />
          <Tab label="Editar Menu" />
        </Tabs>

        <Box hidden={activeTab !== 0}>
          <CadastrarMenu></CadastrarMenu>
        </Box>

        <Box hidden={activeTab !== 1}>
          <EditarMenu menuList={menuList}></EditarMenu>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;