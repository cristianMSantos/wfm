import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import IconSelector from "./IconSelector";

import * as Icons from "@mui/icons-material"; // Import all available icons

const MenuAccordionItem = ({ menu, sections, onUpdate }) => {
  const [text, setText] = useState(menu.text);
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [section, setSection] = useState(menu.section);
  const [newItemIcon, setNewItemIcon] = useState(false);
  const [IconComponent, setIconComponent] = useState(Icons[menu.icon]);
  //   const IconComponent = Icons[menu.icon]; // Dynamically retrieve the icon component

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleIconSelectorOpen = () => {
    setIsIconSelectorOpen(true);
  };

  const handleIconSelectorClose = (icon) => {

    if (typeof icon === "string" || icon instanceof String) {
      setNewItemIcon(icon);
      setIconComponent(Icons[icon]);
    }
    setIsIconSelectorOpen(false);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create updatedMenu object with changed values
    const updatedMenu = {
      ...menu,
      text: text,
      section: section,
      icon: newItemIcon ? newItemIcon : menu.icon,
    };

    // Call onUpdate function to update the item
    // onUpdate(updatedMenu);
    console.log(updatedMenu);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          cursor: "pointer",
          border: "1px solid gray",
          borderRadius: "16px",
          padding: "10px",
        }}
      >
        <div style={{ marginRight: "20px" }}>ícone do menu:</div>
        {IconComponent && (
          <IconComponent onClick={handleIconSelectorOpen} />
        )}{" "}
        {/* Add onClick handler to the icon */}
      </div>
      <IconSelector
        isOpen={isIconSelectorOpen}
        onClose={handleIconSelectorClose}
      />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Menu"
              value={text}
              onChange={handleTextChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Grupo</InputLabel>
              <Select value={section} onChange={handleSectionChange}>
                {sections.map((sectionItem) => (
                  <MenuItem key={sectionItem} value={sectionItem}>
                    {sectionItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Rota"
              value={menu.route}
              onChange={handleTextChange}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            {" "}
            <FormControl
              fullWidth
              margin="normal"
              sx={{
                padding: "5px",
                border: "1px solid gray",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label="Ativar/Desativar"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default MenuAccordionItem;