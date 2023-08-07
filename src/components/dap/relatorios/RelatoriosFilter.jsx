import React from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
    Button,
    Box,
    Card,
    CardContent,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { fetchTableDatas } from "../../../store/features/dap/Relatorios";
import Grid from '@mui/material/Unstable_Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import RelatoriosTable from './RelatoriosTable.jsx';
import { RelatoriosGuideSearch } from "./RelatoriosGuide.jsx";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'dayjs/locale/pt-br';

export default function RelatoriosFilter({ setIsLoading, setIsDataAvailable }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [month, setMonth] = useState(dayjs());
    const [year, setYear] = useState(dayjs());
    // const [isLoading, setIsLoading] = useState(false);
    // const [isDataAvailable, setIsDataAvailable] = useState(false);
    const token = useSelector((state) => state.login.isAuthenticated);
    const dispatch = useDispatch();
    // const currencies = [
    //     {
    //       value: 'curitiba',
    //       label: 'Curitiba',
    //     },
    //     {
    //       value: 'colombo',
    //       label: 'Colombo',
    //     }
    //   ];
    dayjs.locale('pt-br');

    const handleSearch = async (e) => {
        e.preventDefault()

        const filterDatas = [
            {
                month: dayjs(month).format('MM'),
                year: dayjs(year).format('YYYY')
            }
        ]

        if (month !== '' && year !== '') {
            setIsLoading(true);
            
            try {
                await dispatch(fetchTableDatas([filterDatas, { token: token }]));
                setIsDataAvailable(true); // Define que os dados estão disponíveis

            } catch (error) {
                console.error("Erro ao buscar os dados:", error);

            } finally {
                setIsLoading(false); // Caso o try ou catch seja acionado, o loading é finalizado.
            }
        }
    }

    const handleCleanFields = (e) => {
        e.preventDefault();
        setMonth('');
        setYear('');
        setIsDataAvailable(false);
    }
        
    return (
        <>
            <Box
                component="form"
                autoComplete="off"
                sx={{ height: '100%' }}
                colors={colors}
                onSubmit={handleSearch}
            >
                <Grid
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2
                    }}
                    colors={colors}
                    container
                    spacing={{ xs: 2, md: 3 }}
                    // columns={{ xs: 4, sm: 8, md: 3 }}
                >
                    <Grid md={6}>
                        {/* <TextField
                            id="outlined-select-currency"
                            select
                            label="Contratos"
                            helperText="Selecione o contrato"
                            colors={colors}
                            fullWidth
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label={'Mês:'}
                                    openTo="month"
                                    views={['month']}
                                    value={month} 
                                    onChange={(newDate) => setMonth(newDate)}
                                />
                                <DatePicker
                                    label={'Ano:'}
                                    openTo="year"
                                    views={['year']}
                                    value={year} 
                                    onChange={(newDate) => setYear(newDate)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    {/* <Grid md={6}>
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Gestor"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Selecione o gestor"
                            fullWidth
                        >
                            {currencies.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid> */}
                </Grid>
                <Grid
                    container
                    justifyContent="center"
                    spacing={3}
                    sx={{ padding: 2 }}
                >
                    <Grid item>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={handleCleanFields}
                        >
                            Limpar Campos
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            size="medium"
                            sx={{ padding: '6px 33.79px' }}
                            type="submit"
                        >
                            Pesquisar
                        </Button>
                    </Grid>
                </Grid>
                {/* {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {isDataAvailable ? (
                            <RelatoriosTable />
                        ) : (
                            <RelatoriosGuideSearch />
                        )}
                    </>
                )} */}
            </Box>
        </>
    )
}