import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import CadItem from "./Cadtem";
import EditItem from "./EditItem";
import CadSubItem from "./CadSubItem";
import EditSubItem from "./EditSubItem";
const AddItem = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Box sx={{ minHeight: "80vh" }}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Cadastrar Item" />
              <Tab label="Editar Item" />
            </Tabs>
          </Box>
          <Box hidden={activeTab !== 0}>
            <CadItem></CadItem>
          </Box>
          <Box hidden={activeTab !== 1}>
            <EditItem></EditItem>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddItem;
