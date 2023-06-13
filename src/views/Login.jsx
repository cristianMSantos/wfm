import './Login.css';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from '../store/features/Login'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(setLogin({
            email: data.get('matricula'),
            password: data.get('password'),
        }))
    };

    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
            <Grid container className='grid-container' sx={{ height: '100vh', width: '100%' }}>
                <Grid item xs={12} md={8} className='grid-img'>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box component="form" onSubmit={handleSubmit} className="box-login">
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
                                        name="matricula"
                                        label="Matricula"
                                    // variant="filled"
                                    />
                                    <TextField
                                        required
                                        id="password"
                                        name="password"
                                        type="password"
                                        label="Senha"
                                    // variant="filled"
                                    />
                                    {/* <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Lembrar-me"
                                    /> */}
                                    <Button type="submit" variant="contained" color="success">
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