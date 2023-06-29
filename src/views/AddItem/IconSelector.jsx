import React, { useState, useEffect } from "react";
import * as Icons from "@mui/icons-material";
import {
  ArrowBack,
  ArrowForward,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Card,
  CardActions,
  RadioGroup,
  Radio,
  CardContent,
  CardHeader,
  Button,
  Tabs,
  Tab,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const IconSelector = ({ onSelectIcon }) => {
  const allIcons = Object.keys(Icons);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const iconsPerPage = 21; // Adjust the number of icons per page as desired
  const iconsPerRow = 7; // Adjust the number of icons per row as desired

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    onSelectIcon(icon); // Pass the Icon component instead of the icon string
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to the first page when search text changes
  };

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
    setCurrentPage(1); // Reset to the first page when selected style changes
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

  const renderIcons = () => {
    const filteredIcons = filterIcons();
    const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);

    // Calculate the start and end index of icons to render for the current page
    const startIndex = (currentPage - 1) * iconsPerPage;
    const endIndex = startIndex + iconsPerPage;
    const iconsToRender = filteredIcons.slice(startIndex, endIndex);

    const gridItems = iconsToRender.map((icon) => {
      const { [icon]: Icon } = Icons;

      return (
        <IconButton
          key={icon}
          color="default"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: `${100 / iconsPerRow}%`, // Adjust the width as desired
            padding: "8px",
          }}
          onClick={() => handleIconSelect(icon)}
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

    const gridRows = [];
    for (let i = 0; i < gridItems.length; i += iconsPerRow) {
      const rowItems = gridItems.slice(i, i + iconsPerRow);
      gridRows.push(
        <Box
          key={i}
          display="flex"
          justifyContent="center"
          sx={{ marginBottom: "8px" }}
        >
          {rowItems}
        </Box>
      );
    }

    return gridRows;
  };

  const goToNextPage = () => {
    const filteredIcons = filterIcons();
    const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);

    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    // Ensure current page is within the valid range when icons or filtering options change
    const filteredIcons = filterIcons();
    const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [allIcons, selectedStyle, searchText]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      justifyContent="center"
      padding="16px"
      width="100%"
      maxHeight="500px"
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
        <FormControlLabel value="filled" control={<Radio />} label="Filled" />
        <FormControlLabel
          value="outlined"
          control={<Radio />}
          label="Outlined"
        />
        <FormControlLabel value="round" control={<Radio />} label="Rounded" />
        <FormControlLabel
          value="twotone"
          control={<Radio />}
          label="Two Tone"
        />
        <FormControlLabel value="sharp" control={<Radio />} label="Sharp" />
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
          borderRadius: "16px",
          padding: "30px",
        }}
      >
        {renderIcons()}
      </div>
      <Box display="flex" justifyContent="center" marginTop="16px">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          sx={{ marginRight: "8px" }}
          startIcon={<ArrowBack />}
        ></Button>
        <Button
          onClick={goToNextPage}
          disabled={
            currentPage === Math.ceil(filterIcons().length / iconsPerPage)
          }
          endIcon={<ArrowForward />}
        ></Button>
      </Box>
    </Box>
  );
};
export default IconSelector;
