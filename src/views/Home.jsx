import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const theme = useTheme();
    const navigate = useNavigate()

    return (
        <div>
            <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Home</Typography>
        </div>
    )
}