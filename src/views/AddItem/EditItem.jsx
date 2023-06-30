import React, { useState, useEffect } from "react";
import * as Icons from "@mui/icons-material";
import IconSelector from "./IconSelector";
import {
  Box,
  Collapse,
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
  Divider,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";

const CustomIcon = ({ iconName }) => {
  // Convert PascalCase icon name to camelCase
  console.log(iconName);
  const iconNameCamelCase = `${iconName
    .charAt(0)
    .toLowerCase()}${iconName.slice(1)}`;

  // Check if the icon component exists in the imported Icons object
  const IconComponent = Icons[iconName];

  // Render the icon component if it exists, or fallback to a default icon
  return IconComponent ? <IconComponent /> : <Icons.Add />;
};

const EditItem = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const menuItems = useSelector((state) => state.menu.list);
  const [expandedItems, setExpandedItems] = useState([]);
  const [nome, setNome] = useState({});
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [IconComponent, setIconComponent] = useState(Icons.WifiTetheringSharp);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedSubItems, setExpandedSubItems] = useState([]);
  const [grupo, setGrupo] = useState("");
  const [addingNewGrupo, setAddingNewGrupo] = useState(false);
  const [newGrupo, setNewGrupo] = useState("");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const sectionsArray = menuItems
      .map((menuItem) => menuItem.section)
      .filter((value, index, self) => self.indexOf(value) === index);
    setSections(sectionsArray);
  }, [menuItems]);

  const handleCheckboxChange = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems((prevExpanded) =>
        prevExpanded.filter((id) => id !== itemId)
      );
    } else {
      setExpandedItems((prevExpanded) => [...prevExpanded, itemId]);
    }
  };

  const handleSubItemCheckboxChange = (subItemId) => {
    if (expandedSubItems.includes(subItemId)) {
      setExpandedSubItems((prevExpanded) =>
        prevExpanded.filter((id) => id !== subItemId)
      );
    } else {
      setExpandedSubItems((prevExpanded) => [...prevExpanded, subItemId]);
    }
  };

  const handleNewGrupoChange = (event) => {
    setNewGrupo(event.target.value);
  };

  const handleAddNewGrupo = () => {
    if (newGrupo.trim() !== "") {
      setGrupo(newGrupo);
      setNewGrupo("");
      setSections((sections) => [...sections, newGrupo]);
      setAddingNewGrupo(false);
    }
  };

  const handleCancelAddNewGrupo = () => {
    setNewGrupo("");
    setAddingNewGrupo(false);
  };

  const handleGrupoChange = (event) => {
    const value = event.target.value;
    if (value === "__add_new__") {
      setAddingNewGrupo(true);
      setNewGrupo("");
    } else {
      setGrupo(value);
      setAddingNewGrupo(false);
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleNomeChange = (itemId, value) => {
    setNome((prevNome) => ({
      ...prevNome,
      [itemId]: value,
    }));
  };

  const handleIconSelect = (icon) => {
    if (typeof icon === "string" || icon instanceof String) {
      setSelectedIcon(icon);
    }
    handleCloseDialog();
  };

  return (
    <Box
      sx={{
        marginTop: "10px",
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      {menuItems.map((item) => (
        <Card key={item.id} sx={{ marginBottom: "30px" }}>
          <CardHeader
            title={item.text}
            action={
              <Checkbox
                checked={expandedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
            }
          />
          <Collapse in={expandedItems.includes(item.id)}>
            <CardContent>
              <Box
                display="grid"
                gap="10px"
                gridTemplateColumns="1fr 1fr"
                sx={{
                  gridColumn: "span 2",
                }}
              >
                <TextField
                  variant="filled"
                  type="text"
                  value={nome[item.id] || item.text}
                  label="Nome"
                  onChange={(event) => {
                    handleNomeChange(item.id, event.target.value);
                  }}
                />
                <TextField
                  variant="filled"
                  type="text"
                  value={
                    "/" +
                    (nome[item.id]
                      ? nome[item.id]
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/[^\w\s]/gi, "")
                          .toLowerCase()
                      : item.text
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/[^\w\s]/gi, "")
                          .toLowerCase())
                  }
                  label="Rota"
                />
              </Box>

              <Box
                sx={{
                  gridColumn: "span 2",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography>Escolher ícone:</Typography>
                <IconButton onClick={handleOpenDialog}>
                  {selectedIcon ? (
                    <CustomIcon iconName={selectedIcon} />
                  ) : (
                    <CustomIcon iconName={item.icon} />
                  )}
                </IconButton>
              </Box>

              <FormControl fullWidth>
                <InputLabel id="grupo-label">Grupo</InputLabel>
                {!addingNewGrupo ? (
                  <Select
                    labelId="grupo-label"
                    value={grupo || item.section}
                    onChange={handleGrupoChange}
                  >
                    {sections.map((section) => (
                      <MenuItem key={section} value={section}>
                        {section}
                      </MenuItem>
                    ))}
                    <MenuItem value="__add_new__">+ Adicionar novo</MenuItem>
                  </Select>
                ) : (
                  <Box display="flex" alignItems="center">
                    <TextField
                      variant="filled"
                      type="text"
                      value={newGrupo}
                      onChange={handleNewGrupoChange}
                    />
                    <Button onClick={handleAddNewGrupo}>Adicionar</Button>
                    <Button onClick={handleCancelAddNewGrupo}>Cancelar</Button>
                  </Box>
                )}
              </FormControl>

              {item.subItems && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Subitems:</Typography>
                  <Divider />
                  {item.subItems.map((subItem) => (
                    <Card key={subItem.id} sx={{ marginBottom: "10px" }}>
                      <CardHeader
                        title={subItem.text}
                        action={
                          <Checkbox
                            checked={expandedSubItems.includes(subItem.id)}
                            onChange={() =>
                              handleSubItemCheckboxChange(subItem.id)
                            }
                          />
                        }
                      />
                      <Collapse in={expandedSubItems.includes(subItem.id)}>
                        <CardContent>
                          <Typography variant="body2">
                            {subItem.text}
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  ))}
                </Box>
              )}
            </CardContent>
          </Collapse>
        </Card>
      ))}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Escolher ícone</DialogTitle>
        <DialogContent>
          <IconSelector onSelectIcon={handleIconSelect} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EditItem;
