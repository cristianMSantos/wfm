import './Login.css';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import api from '../axios'
import { setLogin } from '../store/features/Login'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from '../assets/images/logo.png'

const LightTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff', // Cor primária definida como branco
        },
    },
});

export default function Login() {
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setLoading(true);

        const options = {
            url: `/auth/login`,
            method: 'POST',
            data: {
                loginPassword: data.get('password'),
                loginMatricula: data.get('matricula'),
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
        return await api(options)
            .then((response) => {
                dispatch(setLogin(response.data.access_token))
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                console.error('Erro ao efetuar o login:', error.response);
            })
    };

    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
            <Grid container className='grid-container' sx={{ height: '100vh', width: '100%' }}>
                <Grid item xs={12} md={8} className='grid-img'>
                    <div className='overlay'>
                        <Typography className='login-message' variant="h2" gutterBottom>
                            Seja bem vindo ao seu novo <span style={{ color: '#073377' }}>Sistema </span> 
                            de Gestão <span style={{ color: '#073377' }}>Plansul</span>
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box component="form" onSubmit={handleSubmit} className="box-login">
                        <ThemeProvider theme={LightTheme}>
                            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                                <Grid item xs={6} md={6} className='grid-logo'>
                                    <img className='img-logo' src={Logo} style={{ width: '100%' }}></img>
                                </Grid>
                                <Grid item xs={8} md={8}>
                                    <Box sx={{
                                        '& .MuiTextField-root': { mb: 1, width: '100%' },
                                        '& .MuiLoadingButton-root': { mb: 1, width: '100%', backgroundColor: '#0D5710', color: 'white' },
                                    }}>
                                        <h3 className='login-title'>Login</h3>
                                        <TextField
                                            required
                                            id="matricula"
                                            name="matricula"
                                            label="Matricula"
                                            autoComplete="matricula"
                                        // variant="filled"
                                        />
                                        <TextField
                                            required
                                            id="password"
                                            name="password"
                                            type="password"
                                            label="Senha"
                                            autoComplete="current-password"
                                        // variant="filled"
                                        />
                                        <FormControlLabel
                                            className='login-remember'
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Lembrar-me"
                                        />
                                        <LoadingButton loading={loading}  type="submit" variant="contained" color="success">
                                            Acessar
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}