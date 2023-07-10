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
  Grid
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import api from "../../axios";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();

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
      id: nome,
      icon: selectedIcon,
      text: nome,
      hasSubItems: isSubItemChecked,
      ...(!isSubItemChecked && { route: `/${nome.toLowerCase()}${isSubItemChecked ? `/${nomeSubitem.toLowerCase()}` : ""}` }),
      subItems: isSubItemChecked
        ? {
          id: nomeSubitem,
          icon: subitemSelectedIcon,
          text: nomeSubitem,
          route: `/${nome.toLowerCase()}${isSubItemChecked ? `/${nomeSubitem.toLowerCase()}` : ""}`,
        }
        : null,
      section: grupo,
    };

    const options = {
      url: `sidebar/createMenu`,
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token ? `Bearer ${token}` : "",
      },
      data: formData
    };

    try {
      const response = await api(options);
    } catch (error) {
      console.error("Error fetching menu:", error.response);
    }
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ padding: theme.spacing(2) }}>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
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
        </Grid>
        <Grid item xs={12} md={5}>
          <FormControl fullWidth>
            <InputLabel id="grupo-label">Grupo</InputLabel>
            {!addingNewGrupo ? (
              <Select
                labelId="grupo-label"
                value={grupo}
                label="Grupo"
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
        </Grid>
        <Grid item xs={12} md={2}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Ícone do Menu:</Typography>
            <IconButton onClick={handleOpenDialog}>
              {IconComponent && <IconComponent />}
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Adicionar sub-item"
            checked={isSubItemChecked}
            onChange={handleSubItemChange}
            sx={{ display: "flex", justifyContent: "end" }}
          />
          <Collapse in={isSubItemChecked}>
            <Divider></Divider>
            <Grid container spacing={2} sx={{ padding: theme.spacing(4) }}>
              <Grid item xs={12} md={12}>
                <Typography variant="subtitle2">Cadastro de SubMenu</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  value={nomeSubitem}
                  onChange={handleNomeSubitemChange}
                  label="Nome SubMenu"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'end' }}>
                  <Typography>Ícone do SubMenu:</Typography>
                  <IconButton onClick={handleOpenDialog}>
                    {SubItemIconComponent && <SubItemIconComponent />}
                  </IconButton>
                </Box>
              </Grid>

            </Grid>
            <Divider></Divider>
          </Collapse>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Rota"
            value={`/${nome.toLowerCase()}${isSubItemChecked ? `/${nomeSubitem.toLowerCase()}` : ""}`}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ gridColumn: "span 1" }}
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>

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
