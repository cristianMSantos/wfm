import './App.css';
import React, { useState, createContext, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';
import Topbar from './components/TopBar';
import SideBar from './components/SideBar';
import { ColorModeContext, useMode } from './theme';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from './axios'

import Home from './views/Home';
import Login from './views/Login';
import User from './views/User';
import { setLogout } from './store/features/Login';

import { RoutesContext, RoutesElement } from './routes';

export const SidebarContext = createContext();

function App() {
  const [theme, colorMode] = useMode()
  const routes = useContext(RoutesContext);
  const [openSidebar, setOpenSidebar] = useState(true);
  const sidebarWidth = openSidebar ? 240 : 0; // Specify the width of the sidebar when it's open and closed

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.login.isAuthenticated)
  const isAuthenticated = !!token;

  axios.interceptors.response.use(response => {

    return response;
  }, async error => {
    if (isAuthenticated && error.response.status === 401) {
      await dispatch(setLogout())
      navigate('/login')
    }
    return Promise.reject(error);
  });

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${sidebarWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );


  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (
    <div className="App">
      {isAuthenticated ? (
        <>


          <ColorModeContext.Provider value={colorMode} >
            <ThemeProvider theme={theme}>
              <Box sx={{ display: 'flex' }}>
                <CssBaseline />


                <Topbar sidebarOpen={openSidebar} onSidebarToggle={handleSidebarOpen} onSidebarClose={handleSidebarClose} sidebarWidth={sidebarWidth} />
                <SideBar open={openSidebar} onOpen={handleSidebarOpen} onClose={handleSidebarClose} sidebarWidth={sidebarWidth} />
                <Main open={openSidebar}>
                  <DrawerHeader />
                  <Box component="main">
                    <Container maxWidth="lg">
                    <RoutesContext.Provider value={routes}>
                      <RoutesElement />
                    </RoutesContext.Provider>
                    </Container>
                  </Box>
                </Main>


              </Box>
            </ThemeProvider>
          </ColorModeContext.Provider>


        </>
      ) : (
        <Navigate to="/login" />
      )}


      <Routes>
        <Route path="/login" exact element={
          isAuthenticated ? <Navigate to="/" /> : <Login />
        }>
        </Route>
      </Routes>

    </div >
  );
}

export default App;
