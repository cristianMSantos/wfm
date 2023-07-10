import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function User(){
    const theme = useTheme();
    const navigate = useNavigate()

    const handleClick = (event) => {
        event.preventDefault()

        navigate('/')
    }

    return (
        <div>
            <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>User</Typography>
            <button onClick={handleClick}>
                AQUI
            </button>
        </div>
    )
}