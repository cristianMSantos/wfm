import { useTheme } from "@mui/material/styles";
import RelatoriosFilter from '../../components/dap/relatorios/RelatoriosFilter.jsx';
import React from "react";
import { tokens } from "../../theme";

export default function SubRelatorios() {
    const theme = useTheme();
    // const colors = tokens(theme.palette.mode);

    return (
        <>
            <RelatoriosFilter />
        </>
    )
}