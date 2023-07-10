import React from "react";
import { useTheme } from "@mui/material/styles";
import StepperAccess from "./StepperAccess";
import { Card, CardContent, CardHeader, Avatar, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from "@mui/material";

export default function Acessos() {
    const theme = useTheme();

    return (
        <Box>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Cadastro de Acessos">
                </CardHeader>
                <CardContent>
                    <StepperAccess />
                </CardContent>
            </Card>
        </Box>
    )
}