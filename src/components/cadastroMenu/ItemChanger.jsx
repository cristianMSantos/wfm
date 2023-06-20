import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const ItemChanger = ({ defaultIcon }) => {
const DynamicIcon = Icons[defaultIcon];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const allIcons = Object.keys(Icons);
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("all");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    handleClose();
    onSelect(icon);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  const filterIcons = () => {
    return allIcons.filter((icon) => {
      const lowercaseIcon = icon.toLowerCase();
      const lowercaseSearchText = searchText.toLowerCase();
      const style = getIconStyle(icon);

      if (selectedStyle !== "all" && style !== selectedStyle) {
        return false;
      }

      return lowercaseIcon.includes(lowercaseSearchText);
    });
  };

  const getIconStyle = (icon) => {
    const styles = {
      Filled: "filled",
      Outlined: "outlined",
      Rounded: "round",
      TwoTone: "twotone",
      Sharp: "sharp",
    };

    const matchedStyle = Object.keys(styles).find((style) =>
      icon.endsWith(style)
    );

    return matchedStyle ? styles[matchedStyle] : "default";
  };

  const onSelect = (icon) => {
    console.log("Selected Icon:", icon);
    // Perform any desired action with the selected icon
  };

  const renderIcons = () => {
    const icons = filterIcons();
    const iconsPerLine = 7;

    const rows = Math.ceil(icons.length / iconsPerLine);

    const iconRows = [];

    for (let i = 0; i < rows; i++) {
      const startIndex = i * iconsPerLine;
      const endIndex = startIndex + iconsPerLine;
      const rowIcons = icons.slice(startIndex, endIndex);

      const iconRow = rowIcons.map((icon) => {
        const { [icon]: Icon } = Icons;

        return (
          <IconButton
            key={icon}
            onClick={() => handleIconClick(icon)}
            color="default"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: `${100 / iconsPerLine}%`,
              padding: "8px",
            }}
          >
            <Icon
              sx={{
                fontSize: "24px",
                color: selectedIcon === icon ? "primary" : "inherit",
              }}
            />
            <div style={{ textAlign: "center", fontSize: "8px" }}>{icon}</div>
          </IconButton>
        );
      });

      iconRows.push(
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "8px",
          }}
        >
          {iconRow}
        </div>
      );
    }

    return iconRows;
  };

  return (
    <>
      <div>
        <IconButton onClick={handleOpen}>
          <DynamicIcon
            sx={{
              fontSize: "24px",
              color: selectedIcon ? "primary" : "inherit",
            }}
          />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            padding="16px"
            width="600px"
            maxHeight="400px"
          >
            <RadioGroup
              aria-label="icon-style"
              name="icon-style"
              value={selectedStyle}
              onChange={handleStyleChange}
              style={{ marginBottom: "16px" }}
              row
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="filled"
                control={<Radio />}
                label="Filled"
              />
              <FormControlLabel
                value="outlined"
                control={<Radio />}
                label="Outlined"
              />
              <FormControlLabel
                value="round"
                control={<Radio />}
                label="Rounded"
              />
              <FormControlLabel
                value="twotone"
                control={<Radio />}
                label="Two Tone"
              />
              <FormControlLabel
                value="sharp"
                control={<Radio />}
                label="Sharp"
              />
            </RadioGroup>
            <TextField
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              style={{ marginBottom: "16px" }}
            />
            <div
              style={{
                overflowY: "auto",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                backgroundColor: colors.primary[300],
                borderRadius: "16px",
              }}
            >
              {renderIcons()}
            </div>
          </Box>
        </Dialog>
      </div>
    </>
  );
};

export default ItemChanger;
