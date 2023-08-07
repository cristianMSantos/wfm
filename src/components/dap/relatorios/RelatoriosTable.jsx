import * as React from 'react';
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomDatagridV2 from '../../CustomDatagridV2.jsx';

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
    console.log('selection: ' + selection)
    setSelectedRows(selection);
  };

  return (
    <>
      <Box sx={{ height: rows.length > 0 ? null : 400, width: '100%'}}>
        <CustomDatagridV2
            rows={rows}
            columns={columns}
            columnsExcel={columnsExcel}
            cellsExcel={cellsExcel}
            selectedRows={selectedRows}
            handleSelectRow={handleSelectRow}
        />
      </Box>
    </>
  );
}