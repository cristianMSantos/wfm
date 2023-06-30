import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled, useTheme, alpha } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import Paper from "@mui/material/Paper";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { azul, laranja, padrao, padraoDark } from "../tema";
import {
  Avatar,
  AvatarGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  formGroupClasses,
} from "@mui/material";
import { ColorModeContext } from "../theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppbar, setOrientation } from "../store/features/SideBarControl";
import { setMode, setTema } from "../store/features/TemaControl";
import { Add } from "@mui/icons-material";

export default function SwipeableTemporaryDrawer({ onSidebarToggle, open }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const colorMode = React.useContext(ColorModeContext);
  const [isMobile, setIsMobile] = React.useState(
    window.matchMedia("(max-width: 900px)").matches
  );

  const selectedTheme = useSelector((state) => state.temaControl.tema);
  const mode = useSelector((state) => state.temaControl.mode);

  const sidebarControl = useSelector(
    (state) => state.sidebarControl.orientation
  );
  const appBarControl = useSelector((state) => state.sidebarControl.appBar);

  const dispatch = useDispatch();
  const [menu, setMenu] = React.useState("vertical");
  const [bar, setBar] = React.useState("fixed");

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.matchMedia("(max-width: 900px)").matches);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setMenu(sidebarControl);
  }, [sidebarControl]);

  useEffect(() => {
    setBar(appBarControl);
  }, [appBarControl]);

  const handleClick = (open) => (event) => {
    onSidebarToggle(open);
  };
  useEffect(() => {
    if (mode === "light") {
      dispatch(setTema(padrao));
    } else if (mode === "dark") {
      dispatch(setTema(padraoDark));
    }
    localStorage.setItem("current-mode", JSON.stringify(mode));
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("current-theme", JSON.stringify(selectedTheme));
  }, [selectedTheme]);

  const mudarTema = (valor) => {
    if (valor !== padrao && valor !== padraoDark) {
      const action = setMode(null);
      dispatch(action);
    }
    dispatch(setTema(valor));
  };

  const handleChangeMode = (event) => {
    dispatch(setMode(event.target.value));
  };
  const handleAddMenuClick = () => {
    // Handle the click event of the "Adicionar menu" button
    navigate("/adicionaritens");
  };

  const handleChangeMenu = (event) => {
    setMenu(event.target.value);
    dispatch(setOrientation(event.target.value));

    // console.log(event.target.value)
  };

  const handleChangeBar = (event) => {
    setBar(event.target.value);
    dispatch(setAppbar(event.target.value));
  };

  const list = () => (
    <Box
      sx={{
        width: 250,
        backgroundColor: theme.palette.mode,
        ...theme.typography.fontSize,
        color: theme.palette.mode,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      role="presentation"
      //   onKeyDown={handleClick(false)}
    >
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(2),
        }}
      >
        <Grid item xs={10} md={10}>
          <Typography>Personalizar Sistema</Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <IconButton
            aria-label="close"
            onClick={handleClick(false)}
            edge="end"
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(2),
        }}
      >
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={12} md={12}>
            <Typography sx={{ opacity: 0.5 }}>Modo</Typography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="mode"
                name="mode-group"
                value={mode}
                onChange={handleChangeMode}
              >
                <FormControlLabel
                  value="light"
                  control={<Radio />}
                  label={
                    <span style={{ color: theme.palette.primary.main }}>
                      Claro
                    </span>
                  }
                />
                <FormControlLabel
                  value="dark"
                  control={<Radio />}
                  label={
                    <span style={{ color: theme.palette.primary.main }}>
                      Escuro
                    </span>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(2),
        }}
      >
        <Grid item xs={12} md={12}>
          <Typography sx={{ opacity: 0.5 }}>Temas</Typography>
          <AvatarGroup
            variant="rounded"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar sx={{ bgcolor: "#004AAD", mt: 2, mr: 2 }}>
              <Button
                sx={{ width: "100%", height: "100%" }}
                onClick={() => mudarTema(azul)}
              >
                {selectedTheme.name === "plansul" ? (
                  <CheckIcon sx={{ color: "white" }} />
                ) : (
                  ""
                )}
              </Button>
            </Avatar>
            <Avatar sx={{ bgcolor: "#FD6809", mt: 2, mr: 2 }}>
              <Button
                sx={{ width: "100%", height: "100%" }}
                onClick={() => mudarTema(laranja)}
              >
                {selectedTheme.name === "plansul-laranja" ? (
                  <CheckIcon sx={{ color: "white" }} />
                ) : (
                  ""
                )}
              </Button>
            </Avatar>
          </AvatarGroup>
        </Grid>
      </Grid>
      <Divider />
      {!isMobile ? (
        <div>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              padding: theme.spacing(2),
            }}
          >
            <Grid item xs={12} md={12}>
              <Typography sx={{ opacity: 0.5 }}>Menu</Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="menu"
                  name="menu-group"
                  value={menu}
                  onChange={handleChangeMenu}
                >
                  <FormControlLabel
                    value="vertical"
                    control={<Radio />}
                    label="Vertical"
                  />
                  <FormControlLabel
                    value="horizontal"
                    control={<Radio />}
                    label="Horizontal"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Divider />
        </div>
      ) : (
        false
      )}
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(2),
        }}
      >
        <Grid item xs={12} md={12}>
          <Typography sx={{ opacity: 0.5 }}>Barra de Navegação</Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="bar"
              name="bar-group"
              value={bar}
              onChange={handleChangeBar}
            >
              <FormControlLabel
                value="static"
                control={<Radio />}
                label="Estático"
              />
              <FormControlLabel
                value="fixed"
                control={<Radio />}
                label="Fixa"
              />
              {/* <FormControlLabel value="hide" control={<Radio />} label="Esconder" /> */}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider></Divider>
      <Grid
        container
        sx={{
          display: "flex",
          padding: theme.spacing(2),
        }}
      >
        <Grid item xs={12} md={12}>
          <Button onClick={handleAddMenuClick}>
            <AddIcon
              sx={{
                marginRight: "10px",
              }}
            ></AddIcon>
            <Typography>Adicionar menu</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleClick(false)}
        onOpen={handleClick(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
