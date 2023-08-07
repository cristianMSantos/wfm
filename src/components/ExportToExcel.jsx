import React from 'react';
import Button from '@mui/material/Button';
import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import saveAs from 'file-saver';
import { Workbook } from 'exceljs';

export function ExportToExcel({ columnsExcel, cellsExcel, selectedRows }) {

  const handleExport = () => {
    let filteredCellsExcel;
    // Create new Workbook (arquivo Excel)
    const workbook = new Workbook();

    // Add an array to Workbook
    const worksheet = workbook.addWorksheet('Dados');

    // Filter the selected lines before export
    if (selectedRows.length > 0) {
      console.log(selectedRows)
      filteredCellsExcel = cellsExcel.filter((cell, index) => selectedRows.includes(index));

    } else {
      filteredCellsExcel = cellsExcel;
    }

    // Columns defines of array
    worksheet.columns = columnsExcel;

    // Apply style for header
    const headerRow = worksheet.getRow(1); // Get first row (header)
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'gradient',
        gradient: 'angle', // Defines type of gradient like angle gradient
        degree: -90, // Defines the angle of gradient
        stops: [
          { position: 0, color: { argb: 'FF0052CC' } }, // First color of gradient (dark blue)
          { position: 1, color: { argb: 'FF1C90FF' } }, // Second color of gradient (blue)
        ],
      };
      cell.font = {
        color: { argb: 'FFFFFFFF' }, // Font color white
        bold: true, // Fonte em negrito
      };
      cell.border = { // Add black border to top and bottom line of header
        top: { style: 'medium', color: { argb: 'FF000000' } },
        bottom: { style: 'medium', color: { argb: 'FF000000' } },
      };
    });

    // Add datas
    filteredCellsExcel.forEach((item, index) => {
      const row = worksheet.addRow(item);

      // Alternate de background color between gray and white for each line
      row.fill = (index % 2 === 0) ?
        { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } } :
        { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DADADA' } };
    });

    // Create the excel document
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'document.xlsx'); // Name of document
    });
  };

  return (
    <Button
      // variant="outlined"
      onClick={handleExport}
    >
      Exportar para Excel
    </Button>
  );
};
