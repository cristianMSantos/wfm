import "./App.css";
import { alpha } from "@mui/material/styles";
import React, { useState, createContext, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Box } from "@mui/material";
import Topbar from "./components/TopBar";
import SideBar from "./components/sidebar/Sidebar";
import { ColorModeContext, useMode } from "./theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axios";
import Login from "./views/Login";
import { setLogout } from "./store/features/Login";
import { RoutesContext, RoutesElement } from "./routes";
import { azul, laranja, padrao } from "./tema";
export const SidebarContext = createContext();

function App() {
  // const [theme, colorMode] = useMode();
  const routes = useContext(RoutesContext);
  const [openSidebar, setOpenSidebar] = useState(true);
  // const [selectedTheme, setSelectedTheme] = useState(azul);
  // const [mode, setMode] = React.useState("claro");
  const [modoAuxiliar, setModoAuxiliar] = React.useState("claro");
  const sidebarControl = useSelector(
    (state) => state.sidebarControl.orientation
  );
  const sidebarWidth = openSidebar && sidebarControl === "vertical" ? 200 : 0; // Specify the width of the sidebar when it's open and closed
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 900px)").matches
  );

  const selectedTheme = useSelector((state) => state.temaControl.tema);
  const mode = useSelector((state) => state.temaControl.mode);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.isAuthenticated);
  const appBarControl = useSelector((state) => state.sidebarControl.appBar);
  const isAuthenticated = !!token;

  useEffect(() => {
    // console.log("Modo");
    // console.log(mode);
    // console.log("Tema");
    // console.log(selectedTheme.name);
  }, [mode]);

  // useEffect(() => {
  //   console.log(selectedTheme);
  // }, [selectedTheme]);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.matchMedia("(max-width: 900px)").matches);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (isAuthenticated && error.response.status === 401) {
        await dispatch(setLogout());
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    console.log("handleSidebarClose");
    setOpenSidebar(false);
  };

  const tema = createTheme({
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    palette: {
      background: {
        default: selectedTheme.colors.default,
        paper: selectedTheme.colors.paper,
      },
      primary: {
        main: selectedTheme.colors.primary,
        contrastText: selectedTheme.colors.primary,
      },
      secondary: {
        main: selectedTheme.colors.secondary,
        contrastText: selectedTheme.colors.primary,
      },
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            background: selectedTheme.colors.MuiToolbar,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: selectedTheme.colors.MuiTypography,
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: selectedTheme.colors.MuiSvgIcon,
          },
        },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            color: selectedTheme.colors.MuiBreadcrumbs,
            "& .MuiTypography-root": {
              color: selectedTheme.colors.MuiBreadcrumbs,
            },
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            color: selectedTheme.colors.MuiListSubheader,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: alpha(selectedTheme.colors.MuiIconButton, 0.5),
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: alpha(
                selectedTheme.colors.MuiListItemButton,
                0.5
              ),
            },
          },
        },
      },
    },
  });
  const defaultTheme = createTheme({
    palette: {
      mode: mode === "dark" ? "dark" : "light",
      componentMode: mode === "dark" ? "dark" : "light",
    },
  });

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${sidebarWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        minHeight: "100vh",
      }),
    })
  );

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          {/* <ColorModeContext.Provider value={colorMode} >*/}
          <ThemeProvider theme={tema}>
            <Box
              sx={{
                display:
                  isMobile || appBarControl === "static" ? "block" : "flex",
              }}
            >
              <CssBaseline />
              <Topbar
                sidebarOpen={openSidebar}
                onSidebarToggle={handleSidebarOpen}
                onSidebarClose={handleSidebarClose}
                sidebarWidth={sidebarWidth}
              />
              <SideBar
                mode={mode}
                open={openSidebar}
                onOpen={handleSidebarOpen}
                onClose={handleSidebarClose}
                sidebarWidth={sidebarWidth}
              />
              <Main
                open={openSidebar}
                sx={{ marginTop: sidebarControl === "horizontal" ? "10px" : 0 }}
              >
                <DrawerHeader />
                <ThemeProvider theme={defaultTheme}>
                  <Box component="main">
                    <Container maxWidth="lg">
                      <RoutesContext.Provider value={routes}>
                        <RoutesElement />
                      </RoutesContext.Provider>
                    </Container>
                  </Box>
                </ThemeProvider>
              </Main>
            </Box>
          </ThemeProvider>
          {/* </ColorModeContext.Provider> */}
        </>
      ) : (
        <Navigate to="/login" />
      )}

      <Routes>
        <Route
          path="/login"
          exact
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
