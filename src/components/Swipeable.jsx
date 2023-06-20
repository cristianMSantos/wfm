import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material';
import { ColorModeContext } from '../theme';


export default function SwipeableTemporaryDrawer({onSidebarToggle, open}) {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext)
    const [mode, setMode] = React.useState('dark');

    const handleClick = (open) => (event) => {
        onSidebarToggle(open)
    }

    const handleChangeMode = (event) => {
        setMode(event.target.value);
        colorMode.toggleColorMode()
        console.log('handleChangeMode')
    };

  const list = () => (
    <Box
      sx={{ 
        width: 250,
        backgroundColor: theme.palette.mode,
        ...theme.typography.fontSize,
        color: theme.palette.mode,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
         }}
      role="presentation"
    //   onKeyDown={handleClick(false)}
    >
      <Grid container sx={{display: 'flex', alignItems: 'center', padding: theme.spacing(2),}}>
        <Grid item xs={10} md={10}>
            <Typography>Personalizar Sistema</Typography>
        </Grid>
        <Grid item xs={2} md={2}>
            <IconButton aria-label='close' onClick={handleClick(false)} edge="end">
                <CloseIcon />
            </IconButton>
        </Grid>
      </Grid>  
      <Divider />
      <Grid container sx={{display: 'flex', alignItems: 'center',  padding: theme.spacing(2),}}>
        <FormControl>
            <Grid container sx={{display: 'flex', alignItems: 'center'}}>
                <Grid item xs={12} md={12}>
                    <FormLabel disabled={true} id="mode">Modo</FormLabel>
                    <RadioGroup
                            row
                            aria-labelledby="mode"
                            name="mode-group"
                            value={mode}
                            onChange={handleChangeMode}
                        >
                        <FormControlLabel value="dark" control={<Radio />} label="Escuro" />
                        <FormControlLabel value="light" control={<Radio />} label="Claro" />
                    </RadioGroup>
                </Grid>
            </Grid>
        </FormControl>
      </Grid>  
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
        <SwipeableDrawer
            anchor='right'
            open={open}
            onClose={handleClick(false)}
            onOpen={handleClick(true)}
        >
            {list()}
        </SwipeableDrawer>
    </div>
  );
}