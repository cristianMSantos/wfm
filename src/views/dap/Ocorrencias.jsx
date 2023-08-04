import React, { useState } from "react";
import {
  Box,
  Card,
  Button,
  Grid,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import MultiSelect from "../../components/MultiSelect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const contratos = ["Curitiba", "Colombo"];
const tipoOcorrencias = ["Abandono de Emprego", "Acidente de Trabalho"];

const Ocorrencias = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedContratos, setSelectedContratos] = useState([]);
  const [selectedTipoOcorrencias, setSelectedTipoOcorrencias] = useState([]);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          borderTop: "5px solid #FD6809",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "20%", marginLeft: "20px", marginTop: "10px" }}
        >
          Nova Ocorrência
        </Button>
        <motion.div
          initial={{ width: "20%", marginLeft: "20px", marginTop: "10px" }}
          animate={{ width: isExpanded ? "90%" : "20%" }}
          transition={{ duration: 0.3 }}
        >
          <Card sx={{ marginBottom: "20px" }}>
            <CardHeader
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Add this style
              }}
              onClick={handleExpand}
              title="Filtros"
              action={
                <IconButton>
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              }
            />
            {isExpanded && (
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item sm={3}>
                    <MultiSelect
                      label="Contrato"
                      options={contratos}
                      selectedValues={selectedContratos}
                      onChange={setSelectedContratos}
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <TextField
                      label="Matrícula Colaborador"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <MultiSelect
                      label="Tipo de Ocorrência"
                      options={tipoOcorrencias}
                      selectedValues={selectedTipoOcorrencias}
                      onChange={setSelectedTipoOcorrencias}
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ marginTop: "20px" }}>
                  <Grid item sm={6}>
                    <MultiSelect
                      label="Gestor"
                      options={tipoOcorrencias}
                      selectedValues={selectedTipoOcorrencias}
                      onChange={setSelectedTipoOcorrencias}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <MultiSelect
                      label="Supervisor"
                      options={tipoOcorrencias}
                      selectedValues={selectedTipoOcorrencias}
                      onChange={setSelectedTipoOcorrencias}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            )}
          </Card>
        </motion.div>
      </Card>
    </Box>
  );
};

export default Ocorrencias;
