import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  Tabs,
  Tab,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const CadastroMenu = () => {
  const [openCadastroMenu, setOpenCadastroMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const menu = useSelector((state) => state.menu); 
  console.log(menu);

  const handleOpen = () => {
    setOpenCadastroMenu(true);
  };

  const handleClose = () => {
    setOpenCadastroMenu(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Cadastrar Menu
      </Button>
      <Dialog open={openCadastroMenu} onClose={handleClose}>
        <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Criar Menu" />
            <Tab label="Editar Menu" />
          </Tabs>
          {activeTab === 0 && (
            <div>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Cadastrar Items</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Cadastrar Sub-items</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          )}
           {activeTab === 1 && (
            <div>
              <Typography variant="h6">Menu Items:</Typography>
              <ul>
                {menu.list.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CadastroMenu;
