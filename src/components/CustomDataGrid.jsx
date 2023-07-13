import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

const initialRows = [
  {
    id: 1,
    nome: randomTraderName(),
    matricula: 113707,
    perfil: randomCreatedDate(),
    liberado_por: randomUpdatedDate(),
    data_criacao: randomUpdatedDate(),
  },
  {
    id: 2,
    nome: randomTraderName(),
    matricula: 113707,
    perfil: randomCreatedDate(),
    liberado_por: randomUpdatedDate(),
    data_criacao: randomUpdatedDate(),
  },
  {
    id: 3,
    nome: randomTraderName(),
    matricula: 113707,
    perfil: randomCreatedDate(),
    liberado_por: randomUpdatedDate(),
    data_criacao: randomUpdatedDate(),
  },
  {
    id: 4,
    nome: randomTraderName(),
    matricula: 113707,
    perfil: randomCreatedDate(),
    liberado_por: randomUpdatedDate(),
    data_criacao: randomUpdatedDate(),
  },
  {
    id: 5,
    nome: randomTraderName(),
    matricula: 113707,
    perfil: randomCreatedDate(),
    liberado_por: randomUpdatedDate(),
    data_criacao: randomUpdatedDate(),
  },
  {
    id: 6,
    nome: randomTraderName(),
    matricula: 113707,
    perfil: randomCreatedDate(),
    liberado_por: randomUpdatedDate(),
    data_criacao: randomUpdatedDate(),
  },
];


export default function CustomDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const onRowEditStart = (event) => {
    console.log(event)
  }

  const onRowEditCommit = (event) => {
    console.log(event)
  }

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: 'edit' } });
  };

  const handleSaveClick = (id, row) => () => {
    console.log(row)
  };

  const handleDeleteClick = (id) => () => {
    console.log('handleDeleteClick')
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode:'view', ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const columns = [
    {
      field: 'nome',
      headerName: 'Nome',
      width: 180,
    },
    {
      field: 'matricula',
      headerName: 'Matricula',
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'perfil',
      headerName: 'Perfil',
      width: 180,
      editable: true,
    },
    {
      field: 'liberado_por',
      headerName: 'Liberado Por',
      width: 220,
    },
    {
      field: 'data_criacao',
      headerName: 'Data de Registro',
      type: 'date',
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
            onClick={handleDeleteClick(id)}
            color="inherit"
          >
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];


  return (
    <Box>
      <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={12} md={12}>
          <DataGrid
            rowModesModel={rowModesModel}
            onRowEditStart={onRowEditStart}
            onRowEditCommit={onRowEditCommit}
            editMode="row"
            rows={rows}
            columns={columns} />
        </Grid>
      </Grid>
    </Box>
  )
}