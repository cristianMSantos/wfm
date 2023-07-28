import { useTheme } from "@mui/material/styles";
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Card,
    Button,
    Typography,
  } from "@mui/material";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import RelatoriosFilter from '../../components/dap/relatorios/RelatoriosFilter.jsx';
import React from "react";
import { tokens } from "../../theme";

export default function SubRelatorios() {
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
        <>
            <RelatoriosFilter />
        </>
    )
}