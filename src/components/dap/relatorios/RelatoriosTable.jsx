import * as React from 'react';
import api from "../../../axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRelatorios } from "../../../store/features/dap/Relatorios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function RelatoriosTable() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.isAuthenticated);
  useEffect(() => {
    getReportData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = useSelector((state) => state.relatorios.dataReport)

  const getReportData = async () => {
    const options = {
      url: `relatoriosDap/getRelatoriosDap`,
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    try {
      const response = await api(options);
      // console.log('response: ' + response.data[0].matricula)
      dispatch(setRelatorios(response.data));

    } catch (error) {
      console.error("Error fetching menu:", error.response);
      setError(
        "Falha ao montar o menu. Entre em contato com o time de desenvolvimento."
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Matrícula</StyledTableCell>
            <StyledTableCell align="right">Nome</StyledTableCell>
            <StyledTableCell align="right">Atestado</StyledTableCell>
            <StyledTableCell align="right">Faltas</StyledTableCell>
            <StyledTableCell align="right">FGA</StyledTableCell>
            <StyledTableCell align="right">FGC</StyledTableCell>
            <StyledTableCell align="right">Observação</StyledTableCell>
            <StyledTableCell align="right">Quantidade AT</StyledTableCell>
            <StyledTableCell align="right">Quantidade FTI</StyledTableCell>
            <StyledTableCell align="right">Quantidade FGA</StyledTableCell> 
            <StyledTableCell align="right">Quantidade FGC</StyledTableCell> 
            <StyledTableCell align="right">Quantidade Outros</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.matricula}>
              <StyledTableCell component="th" scope="row">
                {row.matricula}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nome}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}