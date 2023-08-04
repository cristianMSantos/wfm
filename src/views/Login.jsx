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
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setUser } from '../store/features/User';

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
    const [error, setError] = React.useState({
        confirmPassword: false,
        matricula: false,
        senha: false
    });
    const [messageError, setMessageError] = React.useState({
        confirmPassword: null,
        matricula: null,
        senha: null
    });

    const [errorLogin, setErrorLogin] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
    const [showResetPassword, setShowResetPassword] = React.useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownPasswordConfirm = (event) => {
        event.preventDefault();
    };

    const moveLogin = () => {
        let loginContainer = document.getElementsByClassName('form-inputs');

        // Remover a classe para reiniciar a animação
        loginContainer[0].classList.remove("animation-right");

        // Adicionar a classe novamente após um pequeno atraso
        setTimeout(() => {
            loginContainer[0].classList.add("animation-right");
        }, 100);

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const options = {
            url: showResetPassword ? `/auth/reset` : `/auth/login`,
            method: 'POST',
            data: {
                loginPassword: data.get('password'),
                loginMatricula: data.get('matricula'),
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }

        if (showResetPassword && document.getElementById('password').value === 'plansul123') {
            setError({ ...error, ['senha']: true });
            setMessageError({ ...messageError, ['senha']: 'A senha não pode ser a padrão!' });
            return
        }

        if (!Object.values(error).includes(true)) {
            setLoading(true);
            return await api(options)
                .then(async (response) => {
                    if (showResetPassword) {
                        setShowResetPassword(false)
                        setLoading(false);
                        setErrorLogin(false);
                        moveLogin()
                    } else {
                        dispatch(setLogin(response.data.access_token))
                        setLoading(false);
                        setErrorLogin(false);

                        const options = {
                            url: `/auth/me`,
                            method: "POST",
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                Authorization: response.data.access_token ? `Bearer ${response.data.access_token}` : "",
                            },
                        };
                        await api(options)
                            .then((response) => {
                                dispatch(setUser(response.data));

                            })
                            .catch((error) => {
                                console.error("Erro ao buscar o usuário:", error.response);
                            });
                        navigate('/');
                    };


                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        setLoading(false);
                        setErrorLogin(true);
                    }

                    if (error.response.status === 403 && error.response.data.error === 'Reset Password') {
                        moveLogin()

                        //delay para mostrar as mudanças após a animação
                        setTimeout(() => {
                            setShowResetPassword(true)
                            setLoading(false);
                        }, 500);
                    }
                })
        }
    };

    const handleRules = (event, field) => {
        setErrorLogin(false)
        if (!event) {
            console.log(!!event)
            setError({ ...error, [field]: true });
            setMessageError({ ...messageError, [field]: 'Campo é Obrigatório' });
            return
        }

        if (field === 'matricula') {
            if (event && event.length < 6 || event && event.length > 6) {
                setError({ ...error, [field]: true });
                setMessageError({ ...messageError, [field]: 'Matrícula Inválida' });
                return
            } else {
                setError({ ...error, [field]: false });
                setMessageError({ ...messageError, [field]: null });
                return
            }
        }

        if (field === 'senha') {

            if (event && document.getElementById('confirmPassword') && event !== document.getElementById('confirmPassword').value) {
                if (showResetPassword && event === 'plansul123') {
                    setError({ ...error, ['senha']: true });
                    setMessageError({ ...messageError, ['senha']: 'A senha não pode ser a padrão!' });
                } else {
                    setError({ ...error, [field]: false, ['confirmPassword']: true });
                    setMessageError({ ...messageError, [field]: null, ['confirmPassword']: 'As senhas não conferem' });
                }

                return
            }

            if (event && document.getElementById('confirmPassword') && event === document.getElementById('confirmPassword').value) {

                if (showResetPassword && event === 'plansul123') {
                    setError({ ...error, ['senha']: true, ['confirmPassword']: false, [field]: false });
                    setMessageError({ ...messageError, ['senha']: 'A senha não pode ser a padrão!' });
                } else {
                    setError({ ...error, [field]: false });
                    setMessageError({ ...messageError, [field]: null, ['confirmPassword']: null, [field]: null });
                }
                return
            }


            setError({ ...error, [field]: false });
            setMessageError({ ...messageError, [field]: null });
            return

        }

        if (field === 'confirmPassword') {
            if (event !== document.getElementById('password').value) {
                setError({ ...error, [field]: true });
                setMessageError({ ...messageError, [field]: 'As senhas não conferem' });
                return
            } else {
                setError({ ...error, [field]: false });
                setMessageError({ ...messageError, [field]: null });
                return
            }
        }


        // setError({ ...error, [field]: false })
        // setMessageError({ ...messageError, [field]: null })
    }

    return (
        <Box className="content">
            <div className="wrap">
                <Grid container className='grid-container'
                    columns={{ xs: 4, sm: 12, md: 12 }}
                    sx={{ height: '100%', width: '100%' }}
                >
                    <Grid item xs={6} sm={6} md={6} className='grid-slider'>
                        <Box className="logo" sx={{ display: 'flex' }}>
                            <img className='img-logo' src={Logo}></img>
                        </Box>
                        <Box className='slideshow'>
                            <div className='slide one'>
                                <h2 className='wfm-departaments'>
                                    <span>DAP</span>
                                </h2>
                                <p>Gerencie Talentos e Potencialize Equipes para um Futuro Brilhante.</p>
                            </div>
                            <div className='slide two'>
                                <h2 className='wfm-departaments'>
                                    <span>R&S</span>
                                </h2>
                                <p>Descubra os Melhores Talentos para Impulsionar o Sucesso da sua Equipe.</p>
                            </div>
                            <div className='slide three'>
                                <h2 className='wfm-departaments'>
                                    <span>Planejamento</span>
                                </h2>
                                <p>Estratégias Eficientes para otimizar Recursos e Alcançar Objetivos.</p>
                            </div>
                            {/* <Box className='two'>
                                <h2><span>CP</span></h2>
                                <p>Sign up to attend any of hundreds of events nationwide</p>
                            </Box> */}
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className="grid-login">
                        <Box component="form" onSubmit={handleSubmit} className="box-login">
                            <ThemeProvider theme={LightTheme}>
                                <Grid container className="container-login" spacing={2}>
                                    <Box className='wfm-container'>
                                        <h1 className='wfm-h1'>WFM</h1>
                                    </Box>
                                    <Grid item xs={9} sm={9} md={9} className='form-inputs'>
                                        <Box sx={{
                                            '& .MuiTextField-root': { mb: 2, width: '100%' },
                                            '& .MuiLoadingButton-root': { mb: 2, width: '100%', backgroundColor: '#0D5710', color: 'white' },
                                        }}>
                                            <h3 className='login-title'>
                                                <span>
                                                    {showResetPassword ? 'Resetar Senha' : 'Login'}
                                                </span>
                                            </h3>
                                            <TextField
                                                variant="standard"
                                                error={error['matricula']}
                                                helperText={messageError['matricula']}
                                                onChange={(event) => handleRules(event.target.value, 'matricula')}
                                                required
                                                id="matricula"
                                                name="matricula"
                                                label="Matricula"
                                                autoComplete="matricula"
                                                InputProps={{
                                                    readOnly: showResetPassword,
                                                    style: {
                                                        borderBottom: '2px solid rgba(0, 0, 0, 0.3)',
                                                        opacity: '0.3',
                                                    },
                                                }}

                                            />
                                            <TextField
                                                variant="standard"
                                                error={error['senha']}
                                                helperText={messageError['senha']}
                                                onChange={(event) => handleRules(event.target.value, 'senha')}
                                                required
                                                id="password"
                                                name="password"
                                                label="Senha"
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    style: {
                                                        borderBottom: '2px solid rgba(0, 0, 0, 0.3)',
                                                        opacity: '0.3',
                                                    },
                                                }}
                                            />
                                            {
                                                showResetPassword ?
                                                    <TextField
                                                        variant="standard"
                                                        error={error['confirmPassword']}
                                                        helperText={messageError['confirmPassword']}
                                                        onChange={(event) => handleRules(event.target.value, 'confirmPassword')}
                                                        required
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        label="Confirmar Senha"
                                                        type={showPasswordConfirm ? 'text' : 'password'}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickShowPasswordConfirm}
                                                                        onMouseDown={handleMouseDownPasswordConfirm}
                                                                    >
                                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                            style: {
                                                                borderBottom: '2px solid rgba(0, 0, 0, 0.3)',
                                                                opacity: '0.3',
                                                            },
                                                        }}
                                                    />
                                                    : null
                                            }
                                            {
                                                errorLogin ?
                                                    <p className='errorLogin'>
                                                        Usuário ou Senha Incorreto!
                                                    </p> : false
                                            }
                                            {/* <FormControlLabel
                                            className='login-remember'
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Lembrar-me"
                                        /> */}
                                            <LoadingButton className='button-save' loading={loading} type="submit" variant="contained">
                                                {showResetPassword ? 'Salvar' : 'Acessar'}
                                            </LoadingButton>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </ThemeProvider>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}