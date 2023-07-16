import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import StepperAccess from "./StepperAccess";
import { Card, CardContent, CardHeader, Avatar, IconButton } from "@mui/material";
import { Box } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomDataGrid from "../../components/CustomDataGrid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import api from "../../axios";
import Alert from "../../components/Alert";
import moment from 'moment'

import AlertDialogSlide from "../../components/AlertDialogSlide";

export default function Acessos() {
    const theme = useTheme();
    const token = useSelector((state) => state.login.isAuthenticated);
    const [valueTab, setValueTab] = React.useState('1');
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openAlertDialog, setAlertDialog] = React.useState(false);
    const [resultAlertDialog, setResultAlertDialog] = React.useState(false);
    const [alertType, setAlertType] = React.useState(undefined);
    const [messageAlert, setMessageAlert] = React.useState('');
    const [rowEditing, setRowEditing] = React.useState({
        edit: false,
        delete: false,
    });
    const [saveDisable, setSaveDisable] = React.useState(true);
    const [loadingTable, setLoadingTable] = React.useState(false);


    const getListAccess = async () => {
        console.log('getListAccess')
        setLoadingTable(true)
        const options = {
            url: `adm/listAccess`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: token ? `Bearer ${token}` : "",
            },
        };

        try {
            let response = await api(options);
            response = response.data.filter(e => {
                if (e.dt_criacao) {
                    return e.dt_criacao = moment(e.dt_criacao).format('DD/MM/YYYY');
                }
            })

            setRows(response)
            setLoadingTable(false)
        } catch (error) {
            setAlertType('error')
            setMessageAlert('Falha na busca de acessos!')
            setOpenAlert(true)
        }
    }

    const saveEdit = async (rowEditing) => {
        const options = {
            url: `adm/access/update`,
            method: "PUT",
            data: rowEditing,
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: token ? `Bearer ${token}` : "",
            },
        };

        try {
            const response = await api(options);
            setAlertType('success');
            setMessageAlert('Acesso atualizado!');
            setOpenAlert(true);
            setResultAlertDialog(false)
            setRowEditing({ ...rowEditing, ['edit']: false, ['delete']: false })
            getListAccess()
        } catch (error) {
            setAlertType('error')
            setMessageAlert('Falha na atualização!')
            setOpenAlert(true)
            setRowEditing({ ...rowEditing, ['edit']: false, ['delete']: false })
        }
    }

    const deleteEdit = async (row) => {
        const options = {
            url: `adm/access/delete`,
            method: "DELETE",
            data: row,
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: token ? `Bearer ${token}` : "",
            },
        };

        try {
            const response = await api(options);
            setAlertType('success');
            setMessageAlert('Acesso excluido!');
            setOpenAlert(true);
            setResultAlertDialog(false)
            setRowEditing({ ...rowEditing, ['edit']: false, ['delete']: false })
            getListAccess()
        } catch (error) {
            setAlertType('error')
            setMessageAlert('Falha na exclusão!')
            setOpenAlert(true)
            setRowEditing({ ...rowEditing, ['edit']: false, ['delete']: false })
        }
    }

    useEffect(() => {
        getListAccess()
    }, [])

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    const onRowEditStart = ({ id }) => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: 'edit' } });
    }

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: 'edit' } });
    };

    const handleSaveClick = (id, row) => () => {
        setRowEditing({ ...rowEditing, ['edit']: row })
        setAlertDialog(true)
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    useEffect(() => {
        console.log(rowEditing)
        if (resultAlertDialog) {
            console.log('SALVAR');
            setRowModesModel({
                ...rowModesModel,
                [rowEditing['edit'].id]: { mode: 'view' },
            });

            if (rowEditing['delete']) {
                deleteEdit(rowEditing['delete'])
            }
            //   (async () => {
            //      saveEdit(rowEditing)
            //   })()
        }
    }, [resultAlertDialog]);

    const handleDeleteClick = (id, row) => () => {
        setRowEditing({ ...rowEditing, ['delete']: row })
        setAlertDialog(true)
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: 'view', ignoreModifications: true },
        });

        setResultAlertDialog(false)

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        if (rowEditing['edit']) {
            saveEdit(newRow)
        }
        return updatedRow;
    };


    const columns = [
        {
            field: 'no_operador',
            headerName: 'Nome',
            width: 180,
        },
        {
            field: 'matricula',
            headerName: 'Matricula',
            // type: 'number',
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'co_perfil',
            headerName: 'Perfil',
            width: 180,
            editable: true,
            type: 'singleSelect',
            valueOptions: [
                { value: 1, label: 'ADMINISTRADOR' },
                { value: 2, label: 'RECRUTAMENTO' },
            ],
        },
        {
            field: 'mat_criacao',
            headerName: 'Liberado Por',
            width: 220,
        },
        {
            field: 'dt_criacao',
            headerName: 'Data de Registro',
            // type: 'date',
            width: 180,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id, row }) => {
                const isInEditMode = rowModesModel[id]?.mode === 'edit';
                if (isInEditMode) {
                    return [
                        <IconButton
                            // disabled={saveDisable}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id, row)}
                        >
                            <SaveIcon />
                        </IconButton>,
                        <IconButton
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        >
                            <CancelIcon />
                        </IconButton>,
                    ];
                }

                return [
                    <IconButton
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    >
                        <EditIcon />
                    </IconButton>,
                    <IconButton
                        label="Delete"
                        onClick={handleDeleteClick(id, row)}
                        color="inherit"
                    >
                        <DeleteIcon />
                    </IconButton>,
                ];
            },
        },
    ];

    return (
        <div>

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
                                <StepperAccess getListAccess={getListAccess} />
                            </CardContent>
                        </TabPanel>
                        <TabPanel value="2">
                            <CustomDataGrid
                                rows={rows}
                                columns={columns}
                                loading={loadingTable}
                                rowModesModel={rowModesModel}
                                processRowUpdate={processRowUpdate}
                                onRowEditStart={onRowEditStart}
                                handleRowModesModelChange={handleRowModesModelChange} />
                        </TabPanel>
                    </TabContext>
                </Card>
            </Box>
            <Box>
                <Alert open={openAlert} type={alertType} setOpenAlert={setOpenAlert} messageAlert={messageAlert} />
                <AlertDialogSlide
                    open={openAlertDialog}
                    setAlertDialog={setAlertDialog}
                    setResultAlertDialog={setResultAlertDialog}
                />
            </Box>
        </div>
    )
}