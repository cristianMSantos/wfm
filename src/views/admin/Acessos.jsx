import React from "react";
import { useTheme } from "@mui/material/styles";
import StepperAccess from "./StepperAccess";
import { Card, CardContent, CardHeader, Avatar, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomDataGrid from "../../components/CustomDataGrid";

export default function Acessos() {
    const theme = useTheme();
    const [valueTab, setValueTab] = React.useState('1');

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    return (
        <Box>
            <Card>
                <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example" centered>
                            <Tab label="Cadastro de Acessos" value="1" />
                            <Tab label="Listagem de Acessos " value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {/* <CardHeader
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
                        </CardHeader> */}
                        <CardContent>
                            <StepperAccess />
                        </CardContent>
                    </TabPanel>
                    <TabPanel value="2">
                        <CustomDataGrid />
                    </TabPanel>
                </TabContext>
            </Card>
        </Box>
    )
}