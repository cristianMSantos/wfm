import { useTheme } from "@mui/material/styles";
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Divider,
    Typography,
  } from "@mui/material";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React from "react";
import RelatoriosTable from './RelatoriosTable.jsx';
import { tokens } from "../../../theme";

export default function RelatoriosFilter() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const currencies = [
        {
          value: 'curitiba',
          label: 'Curitiba',
        },
        {
          value: 'colombo',
          label: 'Colombo',
        }
      ];

    return (
        <div>
            <Card
                sx={{ height: '100%' }}
                colors={colors}
            >
                <CardContent>
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
                            <TextField
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
                            </TextField>
                        </Grid>
                        <Grid md={6}>
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
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent="center"
                        spacing={3}
                        sx={{ padding: 2 }}
                    >
                        <Grid item>
                            <Button variant="contained" size="medium">
                                Limpar Campos
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="medium" sx={{ padding: '6px 33.79px' }}>
                                Pesquisar
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider sx={{ m: '50px 50px'}}></Divider>
                    <RelatoriosTable />
                </CardContent>
            </Card>
        </div>
    )
}