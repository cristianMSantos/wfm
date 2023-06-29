import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

export default function SubTrafego() {
    const theme = useTheme();
    return (
        <div>
            <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>SubTráfego</Typography>
        </div>
    )
}