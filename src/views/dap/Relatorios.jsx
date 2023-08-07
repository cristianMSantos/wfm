import { useTheme } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';
import RelatoriosFilter from '../../components/dap/relatorios/RelatoriosFilter.jsx';
import RelatoriosTable from '../../components/dap/relatorios/RelatoriosTable.jsx';
import React from "react";
import { tokens } from "../../theme";
import { Divider, Card, CardContent, } from "@mui/material";
import { RelatoriosGuideSearch } from "../../components/dap/relatorios/RelatoriosGuide.jsx";
import { useState } from "react";

export default function SubRelatorios() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataAvailable, setIsDataAvailable] = useState(false);
    // const colors = tokens(theme.palette.mode);

    return (
        <>
            <Card>
                <CardContent>
                    <RelatoriosFilter
                        setIsLoading={setIsLoading}
                        setIsDataAvailable={setIsDataAvailable}
                    />
                    <Divider sx={{ m: '30px 50px'}}></Divider>
                    {/* <CustomDatagrid /> */}
                    {/* <RelatoriosGuideSearch /> */}
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {isDataAvailable ? (
                                <RelatoriosTable />
                            ) : (
                                <RelatoriosGuideSearch />
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    )
}