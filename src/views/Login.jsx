import './Login.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const LightTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff', // Cor primária definida como branco
        },
    },
});

export default function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
            <Grid container className='grid-container' sx={{ height: '100vh', width: '100%' }}>
                <Grid item xs={12} md={8} className='grid-img'>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box className="box-login">
                        <ThemeProvider theme={LightTheme}>
                            <Grid item xs={12} md={4} className='grid-logo'>

                            </Grid>
                            <Grid item xs={12} md={8}>
                                <h3 className='login-title'>Login</h3>
                                <Box sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}>
                                    <TextField
                                        required
                                        id="matricula"
                                        label="Matricula"
                                    // variant="filled"
                                    />
                                    <TextField
                                        required
                                        id="senha"
                                        label="Senha"
                                    // variant="filled"
                                    />
                                    <Button variant="contained" color="success">
                                        Acessar
                                    </Button>
                                </Box>
                            </Grid>
                        </ThemeProvider>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}