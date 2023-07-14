import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid';
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid-pro';

export default function CustomDataGrid({ rows, rowModesModel, columns, processRowUpdate, onRowEditStart, handleRowModesModelChange }) {

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const onRowEditCommit = (event) => {
    console.log(event)
  }

  return (
    <Box>
      <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={12} md={12}>
          <DataGrid
            editMode="row"
            rows={rows}
            columns={columns}
            rowModesModel={rowModesModel}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            onRowEditStart={onRowEditStart}
            handleRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            onRowEditCommit={onRowEditCommit}
            processRowUpdate={processRowUpdate}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }} />
        </Grid>
      </Grid>
    </Box>
  )
}