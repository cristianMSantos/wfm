import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, TextField, Grid, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, Autocomplete, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import api from "../../axios";
import axios from 'axios'
import { useSelector } from "react-redux";
import Alert from "../../components/Alert";

export default function StepperAccess({ getListAccess }) {
    const theme = useTheme();
    const token = useSelector((state) => state.login.isAuthenticated);
    const [activeStep, setActiveStep] = React.useState(0);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const [open, setOpen] = React.useState(false);
    const [colaboradorSelected, setColaboradorSelected] = React.useState(undefined);
    const [perfilSelected, setPerfilSelected] = React.useState(undefined);
    const [colaboradorOptions, setColaboradorOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [loadingSave, setLoadingSave] = React.useState(false);
    const [perfis, setPerfis] = React.useState([]);
    const [source, setSource] = React.useState('');
    const [error, setError] = React.useState({
        colaborador: false,
        perfil: false
    });
    const [messageError, setMessageError] = React.useState({
        colaborador: null,
        perfil: null
    });
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState(undefined);
    const [messageAlert, setMessageAlert] = React.useState('');
    const [hasAccess, setHasAccess] = React.useState(undefined);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setColaboradorSelected(undefined)
        setPerfilSelected(undefined)
    };

    const handleInputChange = async (event) => {
        setLoading(true)
        await getColaborador(event)
        setLoading(false)
    };

    const handleCalaboradorChange = async (event, value) => {
        setColaboradorSelected(value)
        if (value) {
            value.map(e => {
                if (e.has_access) {
                    setHasAccess(e.has_access)
                    setError({ ...error, ['colaborador']: true });
                    setMessageError({ ...messageError, ['colaborador']: 'Colaborador já cadastrado!' });
                } else {
                    setHasAccess(e.has_access)
                    setError({ ...error, ['colaborador']: false });
                    setMessageError({ ...messageError, ['colaborador']: null });
                }
            })
        }

        if (value.length <= 0) {
            setError({ ...error, ['colaborador']: false });
            setMessageError({ ...messageError, ['colaborador']: null });
        }

    };

    const handlePerfilChange = async (event, value) => {
        setPerfilSelected(value)
        if (value) {
            setError({ ...error, ['perfil']: false });
            setMessageError({ ...messageError, ['perfil']: null });
        }
    };

    const steps = [
        {
            label: 'Usuário',
            description: `Selecione o Usuário para Cadastro.`,
        },
        {
            label: 'Perfil',
            description:
                'Selecione um Perfil de Acesso.',
        },
        {
            label: 'Confirmação',
            description: `Confirme se todos os items anteriores estão corretos.`,
        },
    ];

    const getPerfis = async () => {
        const options = {
            url: `adm/listPerfis`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: token ? `Bearer ${token}` : "",
            },
        };

        try {
            const response = await api(options);
            setPerfis(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const getColaborador = async (event) => {

        console.log(source)

        if (source) {
            source.cancel();
        }

        const CancelToken = axios.CancelToken
        setSource(CancelToken.source());

        const options = {
            url: `adm/listFuncionarios`,
            method: "POST",
            cancelToken: source.token,
            data: {
                search: event
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: token ? `Bearer ${token}` : "",
            },
        };

        try {
            const response = await api(options);
            setSource('')
            setColaboradorOptions(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoadingSave(true);

        const formData = {
            colaborador: colaboradorSelected,
            perfil: perfilSelected,
        }

        const options = {
            url: `adm/access/create`,
            method: "POST",
            data: formData,
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: token ? `Bearer ${token}` : "",
            },
        };

        console.log(!hasAccess)

        if (colaboradorSelected && perfilSelected && !hasAccess) {
            try {
                const response = await api(options).then(() => {
                    setLoadingSave(false)
                    setAlertType('success')
                    setMessageAlert('Acesso cadastrado!')
                    setOpenAlert(true)
                    handleReset()
                    getListAccess()
                });
            } catch (error) {
                console.log(error.response);
                setLoadingSave(false)
                setAlertType('error')
                setMessageAlert('Falha no cadastro de acessos!')
                setOpenAlert(true)
            }
        }

        if (hasAccess) {
            setActiveStep(0)
            setLoadingSave(false)
        }

        if (!colaboradorSelected || colaboradorSelected.length <= 0) {
            setActiveStep(0)
            setLoadingSave(false)
            setError({ ...error, ['colaborador']: true });
            setMessageError({ ...messageError, ['colaborador']: 'Campo é Obrigatório' });
        }

        if (!perfilSelected || perfilSelected.length <= 0) {
            setActiveStep(1)
            setLoadingSave(false)
            setError({ ...error, ['perfil']: true });
            setMessageError({ ...messageError, ['perfil']: 'Campo é Obrigatório' });
        }

        if ((!colaboradorSelected || colaboradorSelected.length <= 0) && (!perfilSelected || perfilSelected.length <= 0)) {
            setActiveStep(0)
            setLoadingSave(false)
            setError({ ...error, ['colaborador']: true, ['perfil']: true });
            setMessageError({ ...messageError, ['perfil']: 'Campo é Obrigatório', ['colaborador']: 'Campo é Obrigatório' });
        }

    }

    useEffect(() => {
        getPerfis()
    }, [])


    return (
        <div>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 2 ? (
                                                <Typography variant="caption">Último passo</Typography>
                                            ) : null
                                        }
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>
                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                            {
                                                index === 0 ? (
                                                    <Autocomplete
                                                        id="colaborador-select"
                                                        className="colaborador-select"
                                                        sx={{ width: 300 }}
                                                        open={open}
                                                        onOpen={() => {
                                                            setOpen(true);
                                                        }}
                                                        onClose={() => {
                                                            setOpen(false);
                                                        }}
                                                        multiple
                                                        required
                                                        value={colaboradorSelected}
                                                        onChange={handleCalaboradorChange}
                                                        isOptionEqualToValue={(option, value) => option.no_operador === value.no_operador}
                                                        getOptionLabel={(option) => option.no_operador}
                                                        options={colaboradorOptions}
                                                        loading={loading}
                                                        noOptionsText='Nenhum Resultado'
                                                        renderOption={(props, option) => {
                                                            return (
                                                                <li {...props} key={option.matricula_pl}>
                                                                    {option.no_operador}
                                                                </li>
                                                            );
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                required
                                                                error={error['colaborador']}
                                                                helperText={messageError['colaborador']}
                                                                value={colaboradorSelected}
                                                                label="Colaborador"
                                                                placeholder="Digite um Nome ou Matricula"
                                                                onChange={(event) => handleInputChange(event.target.value)}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: (
                                                                        <React.Fragment>
                                                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                                            {params.InputProps.endAdornment}
                                                                        </React.Fragment>
                                                                    ),
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                ) : null
                                            }
                                            {
                                                index === 1 ? (
                                                    <Autocomplete
                                                        id="perfil-select"
                                                        className="perfil-select"
                                                        options={perfis}
                                                        required
                                                        value={perfilSelected}
                                                        onChange={handlePerfilChange}
                                                        disableCloseOnSelect
                                                        getOptionLabel={(option) => option.no_perfil}
                                                        renderOption={(props, option, { selected }) => (
                                                            <li {...props}>
                                                                <Checkbox
                                                                    icon={icon}
                                                                    checkedIcon={checkedIcon}
                                                                    style={{ marginRight: 8 }}
                                                                    checked={selected}
                                                                />
                                                                {option.no_perfil}
                                                            </li>
                                                        )}
                                                        style={{ width: 300 }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                required
                                                                error={error['perfil']}
                                                                helperText={messageError['perfil']}
                                                                label="Perfil"
                                                                placeholder="Administrador" />
                                                        )}
                                                    />
                                                ) : null
                                            }
                                        </Box>
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <LoadingButton
                                                    loading={index === steps.length - 1 ? loadingSave : false}
                                                    variant="contained"
                                                    onClick={index === steps.length - 1 ? (() => { }) : handleNext}
                                                    type={index === steps.length - 1 ? 'submit' : 'button'}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Salvar' : 'Avançar'}
                                                </LoadingButton>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Voltar
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {/* {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                Reset
                            </Button>
                        </Paper>
                    )} */}
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Alert open={openAlert} type={alertType} setOpenAlert={setOpenAlert} messageAlert={messageAlert} />
            </Box>
        </div>
    )
}