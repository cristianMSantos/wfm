import * as React from 'react';
import { Box } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';
import { ExportToExcel } from "../../ExportToExcel.jsx";
import { ptBR } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function RelatoriosTable() {
  const [cells, setCells] = useState([]);
  const [cellsExcel, setCellsExcel] = useState([]);
  let [columnsExcel, setColumnsExcel] = useState();
  const dataReport = useSelector((state) => state.relatorios.dataReport);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setCells(dataReport);
  }, [dataReport]);

  useEffect(() => {
    handleColumnsCellsToExcel();
  }, [cells]);

  useEffect(() => {
    setRows(
      cells.map((e, index) => ({
        id: index, // Index compared with row ID captured on 'handleSelectRow' handle
        matricula: e.Mat_Dac,
        nome: e.Nome,
        al: e.AL,
        at: e.AT,
        fga: e.FGA,
        fgc: e.FGC,
        fti: e.FTI,
        inss: e.INSS,
        mater: e.MATER,
        militar: e.MILITAR,
        su: e.SU,
        supervisor: e.Nome_Gestor1,
        quantidadeAl: e.QTD_AL,
        quantidadeAt: e.QTD_AT,
        quantidadeFga: e.QTD_FGA,
        quantidadeFgc: e.QTD_FGC,
        quantidadeFti: e.QTD_FTI,
        quantidadeOutros: e.QTD_MATER,
        quantidadeInss: e.QTD_INSS,
        quantidadeMater: e.QTD_MATER,
        quantidadeMilitar: e.QTD_MILITAR,
        quantidadeSu: e.QTD_SU
      }))
    );
  }, [cells]);

  const handleColumnsCellsToExcel = () => {
    setColumnsExcel([
      { header: 'Matrícula', key: 'matricula', width: 10 },
      { header: 'Nome', key: 'nome', width: 50 },
      { header: 'AL', key: 'al', width: 20 },
      { header: 'Atestado', key: 'at', width: 20 },
      { header: 'FGA', key: 'fga', width: 20 },
      { header: 'FGC', key: 'fgc', width: 20 },
      { header: 'FTI', key: 'fti', width: 20 },
      { header: 'INSS', key: 'inss', width: 20 },
      { header: 'MATER', key: 'mater', width: 20 },
      { header: 'MILITAR', key: 'militar', width: 20 },
      { header: 'SU', key: 'su', width: 20 },
      { header: 'Supervisor', key: 'supervisor', width: 50 },
      { header: 'Quantidade AL', key: 'quantidadeAl', width: 20 },
      { header: 'Quantidade AT', key: 'quantidadeAt', width: 20 },
      { header: 'Quantidade FGA', key: 'quantidadeFga', width: 20 },
      { header: 'Quantidade FGC', key: 'quantidadeFgc', width: 20 },
      { header: 'Quantidade FTI', key: 'quantidadeFti', width: 20 },
      { header: 'Quantidade INSS', key: 'quantidadeInss', width: 20 },
      { header: 'Quantidade MATER', key: 'quantidadeMater', width: 20 },
      { header: 'Quantidade MILITAR', key: 'quantidadeMilitar', width: 20 },
      { header: 'Quantidade SU', key: 'quantidadeSu', width: 20 }
    ]);

    setCellsExcel(
      cells.map(e => ({
        matricula: e.Mat_Dac,
        nome: e.Nome,
        al: e.AL,
        at: e.AT,
        fga: e.FGA,
        fgc: e.FGC,
        fti: e.FTI,
        inss: e.INSS,
        mater: e.MATER,
        militar: e.MILITAR,
        su: e.SU,
        supervisor: e.Nome_Gestor1,
        quantidadeAl: e.QTD_AL,
        quantidadeAt: e.QTD_AT,
        quantidadeFga: e.QTD_FGA,
        quantidadeFgc: e.QTD_FGC,
        quantidadeFti: e.QTD_FTI,
        quantidadeOutros: e.QTD_MATER,
        quantidadeInss: e.QTD_INSS,
        quantidadeMater: e.QTD_MATER,
        quantidadeMilitar: e.QTD_MILITAR,
        quantidadeSu: e.QTD_SU
      }))
    );
  }

  const columns = [
    { field: 'matricula', headerName: 'Matrícula', width: 80 },
    { field: 'nome', headerName: 'Nome', width: 370 },
    { field: 'al', headerName: 'AL', width: 150 },
    { field: 'at', headerName: 'Atestado', width: 150 },
    { field: 'fga', headerName: 'FGA', width: 150 },
    { field: 'fgc', headerName: 'FGC', width: 150 },
    { field: 'fti', headerName: 'FTI', width: 150 },
    { field: 'inss', headerName: 'INSS', width: 550 },
    { field: 'mater', headerName: 'MATER', width: 550 },
    { field: 'militar', headerName: 'MILITAR', width: 150 },
    { field: 'su', headerName: 'SU', width: 150 },
    { field: 'supervisor', headerName: 'Supervisor', width: 370 },
    { field: 'quantidadeAl', headerName: 'Quantidade AL', width: 120 },
    { field: 'quantidadeAt', headerName: 'Quantidade AT', width: 120 },
    { field: 'quantidadeFga', headerName: 'Quantidade FGA', width: 120 },
    { field: 'quantidadeFgc', headerName: 'Quantidade FGC', width: 120 },
    { field: 'quantidadeFti', headerName: 'Quantidade FTI', width: 120 },
    { field: 'quantidadeInss', headerName: 'Quantidade INSS', width: 150 },
    { field: 'quantidadeMater', headerName: 'Quantidade MATER', width: 150 },
    { field: 'quantidadeMilitar', headerName: 'Quantidade MILITAR', width: 150 },
    { field: 'quantidadeSu', headerName: 'Quantidade SU', width: 120 }
  ];

  // Select the row ID and send like parameter to ExportToExcel component to compere with de index of the cell.
  const handleSelectRow = (selection) => {
    setSelectedRows(selection);
  };

  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>Nenhum Resultado</Box>
      </StyledGridOverlay>
    );
  }

  return (
    <>
      <Box style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>  
        <ExportToExcel
          columnsExcel={columnsExcel}
          cellsExcel={cellsExcel}
          selectedRows={selectedRows}
        />
      </Box>
      <Box style={{ height: rows.length > 0 ? null : 400, width: '100%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
          onRowSelectionModelChange={handleSelectRow}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay
          }}
        />
      </Box>
    </>
  );
}