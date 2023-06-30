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
import AddIcon from "@mui/icons-material/Add";
import api from "../../axios";

const CadItem = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const menuItems = useSelector((state) => state.menu.list);
  const [sections, setSections] = useState([]);
  const [nome, setNome] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [grupo, setGrupo] = useState("");
  const [newGrupo, setNewGrupo] = useState("");
  const [addingNewGrupo, setAddingNewGrupo] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [IconComponent, setIconComponent] = useState(Icons.Add);
  const [SubItemIconComponent, setSubtemIconComponent] = useState(Icons.Add);
  const [subitemSelectedIcon, setSubitemSelectedIcon] = useState(null);
  const [isSubItemChecked, setIsSubItemChecked] = useState(false);
  const [nomeSubitem, setNomeSubitem] = useState("");
  const token = useSelector((state) => state.login.isAuthenticated);
  useEffect(() => {
    const sectionsArray = menuItems
      .map((menuItem) => menuItem.section)
      .filter((value, index, self) => self.indexOf(value) === index);
    setSections(sectionsArray);
  }, [menuItems]);

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
  const handleSubItemChange = (event) => {
    setIsSubItemChecked(event.target.checked);
  };
  const handleNomeSubitemChange = (event) => {
    setNomeSubitem(event.target.value);
  };

  const handleIconSelect = (icon) => {
    if (typeof icon === "string" || icon instanceof String) {
      setSelectedIcon(icon);
      setIconComponent(Icons[icon]);
    }
    handleCloseDialog();
  };

  const handleSubitemIconSelect = (icon) => {
    if (typeof icon === "string" || icon instanceof String) {
      setSubitemSelectedIcon(icon);
      setSubtemIconComponent(Icons[icon]);
    }
    handleCloseDialog();
  };

  const handleNewGrupoChange = (event) => {
    setNewGrupo(event.target.value);
  };
  const handleNomeChange = (event) => {
    setNome(event.target.value);
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
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleSubmit = async () => {
    // Create the object from form data
    const formData = {
      nome: nome,
      grupo: grupo,
      subitem: isSubItemChecked
        ? {
            nomeSubitem: nomeSubitem,
            subitemSelectedIcon: subitemSelectedIcon,
          }
        : null,
      selectedIcon: selectedIcon,
    };
    const options = {
      url: `sidebar/createMenu`,
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token ? `Bearer ${token}` : "",
        data: {
          nome: nome,
          grupo: grupo,
          subitem: isSubItemChecked
            ? {
                nomeSubitem: nomeSubitem,
                subitemSelectedIcon: subitemSelectedIcon,
              }
            : null,
          selectedIcon: selectedIcon,
        },
      },
    };

    try {
      const response = await api(options);
    } catch (error) {
      console.error("Error fetching menu:", error.response);
    }
  };
  const normalizeAndRemoveSpecialChars = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
  };

  return (
    <Box
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        marginTop: "10px",
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <TextField
        variant="filled"
        type="text"
        value={nome}
        onChange={handleNomeChange}
        label="Nome"
        sx={{
          gridColumn: "span 2",
          //   "& .MuiInputBase-input": {
          //     fontSize: "0.5rem",
          //   },
        }}
      />
      <FormControl
        fullWidth
        sx={{
          gridColumn: "span 2",
        }}
      >
        <InputLabel id="grupo-label">Grupo</InputLabel>
        {!addingNewGrupo ? (
          <Select
            labelId="grupo-label"
            value={grupo}
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
          <Box display="flex">
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

      <Box sx={{ gridColumn: "span 1", display: "flex", alignItems: "center" }}>
        <Typography>Escolher ícone:</Typography>
        <IconButton onClick={handleOpenDialog}>
          {IconComponent && <IconComponent />}
        </IconButton>
      </Box>

      <FormControlLabel
        control={<Checkbox color="primary" />}
        label="Adicionar sub-item"
        checked={isSubItemChecked}
        onChange={handleSubItemChange}
        sx={{ gridColumn: "span 1", display: "flex", justifyContent: "center" }}
      />

      <Collapse in={isSubItemChecked} sx={{ gridColumn: "span 4" }}>
        <Divider></Divider>
        <Card>
          <CardContent>Cadastrar Sub-Item</CardContent>
          <CardActions>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              value={nomeSubitem}
              onChange={handleNomeSubitemChange}
              label="Nome Subitem"
              sx={{ gridColumn: "span 2" }}
            />
            <Box
              sx={{
                gridColumn: "span 1",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Escolher ícone:</Typography>
              <IconButton onClick={handleOpenDialog}>
                {SubItemIconComponent && <SubItemIconComponent />}
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      </Collapse>
      <Divider sx={{ gridColumn: "span 4" }}></Divider>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Rota"
        value={`/${normalizeAndRemoveSpecialChars(nome)}${
          isSubItemChecked
            ? `/${normalizeAndRemoveSpecialChars(nomeSubitem)}`
            : ""
        }`}
        InputProps={{
          readOnly: true,
        }}
        sx={{ gridColumn: "span 4" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ gridColumn: "span 1" }}
        onClick={handleSubmit}
      >
        Salvar
      </Button>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Escolher ícone</DialogTitle>
        <DialogContent>
          <IconSelector
            onSelectIcon={handleIconSelect}
            onSelectSubIcon={handleSubitemIconSelect}
            isSubItemChecked={isSubItemChecked}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CadItem;
