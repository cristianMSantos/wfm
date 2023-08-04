import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const MultiSelect = ({ label, options, selectedValues, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        multiple
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValues}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  onChange(selectedValues.filter((item) => item !== value))
                }
                deleteIcon={
                  <CloseOutlinedIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{ justifyContent: "space-between" }}
          >
            {option}
            {selectedValues.includes(option) ? (
              <CheckOutlinedIcon color="info" />
            ) : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
