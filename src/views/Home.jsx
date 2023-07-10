import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const theme = useTheme();
    const navigate = useNavigate()

    const handleClick = (event) => {
        event.preventDefault()

        navigate('/user')
    }

    return (
        <div>
            <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Home</Typography>
            <button onClick={handleClick}>
                AQUI
            </button>
        </div>
    )
}