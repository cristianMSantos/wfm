import React, { useState, useEffect } from 'react';
import {
  TextField,
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
import ItemChanger from './ItemChanger';

const CadastroMenu = () => {
  const [openCadastroMenu, setOpenCadastroMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const menu = useSelector((state) => state.menu);
  const [nomeItem, setNomeItem] = useState('');
  const [itemValues, setItemValues] = useState({});
  const [sectionValues, setSectionValues] = useState({});
  const [routeValues, setRouteValues] = useState({});

  useEffect(() => {
    if (activeTab === 1) {
      const initialItemValues = {};
      const initialSectionValues = {};
      const initialRouteValues = {};
      menu.list.forEach((item) => {
        initialItemValues[item.id] = item.text;
        initialSectionValues[item.id] = item.section;
        initialRouteValues[item.id] = item.route;
      });
      setItemValues(initialItemValues);
      setSectionValues(initialSectionValues);
      setRouteValues(initialRouteValues);
    }
  }, [activeTab, menu.list]);

  const handleNomeItemChange = (event, itemId) => {
    setItemValues((prevItemValues) => ({
      ...prevItemValues,
      [itemId]: event.target.value,
    }));
  };

  const handleSectionChange = (event, itemId) => {
    setSectionValues((prevSectionValues) => ({
      ...prevSectionValues,
      [itemId]: event.target.value,
    }));
  };

  const handleRouteChange = (event, itemId) => {
    // Assuming the route value should not be editable, you can ignore the change event.
    // If you want to update the route value from the UI, you can set up separate logic for it.
  };

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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              {menu.list.map((item) => (
                <Accordion key={item.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{item.text}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <ItemChanger defaultIcon={item.icon} onIconChange={() => {}} />
                      <TextField
                        label="Nome do Item"
                        variant="outlined"
                        value={itemValues[item.id] || ''}
                        onChange={(event) => handleNomeItemChange(event, item.id)}
                        style={{ marginBottom: '16px' }}
                      />
                      <TextField
                        label="Seção"
                        variant="outlined"
                        value={sectionValues[item.id] || ''}
                        onChange={(event) => handleSectionChange(event, item.id)}
                        style={{ marginBottom: '16px' }}
                      />
                      <TextField
                        label="Rota"
                        variant="outlined"
                        value={routeValues[item.id] || ''}
                        onChange={(event) => handleRouteChange(event, item.id)}
                        style={{ marginBottom: '16px' }}
                        disabled
                      />
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CadastroMenu;
