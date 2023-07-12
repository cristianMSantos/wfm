import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function CustomTabPanel() {
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={valueTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example" centered>
            <Tab label="Cadastro de Acessos" value="1" />
            <Tab label="Listagem de Acessos " value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Cadastro</TabPanel>
        <TabPanel value="2">Listagem</TabPanel>
      </TabContext>
    </Box>
  );
}