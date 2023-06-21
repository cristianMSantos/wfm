import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
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
import { Avatar, AvatarGroup, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material';
import { ColorModeContext } from '../theme';


export default function SwipeableTemporaryDrawer({onSidebarToggle, open}) {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext)
    const [mode, setMode] = React.useState('dark');
    const [colorPrimary, setColorPrimary] = React.useState('blue');

    const handleClick = (open) => (event) => {
        onSidebarToggle(open)
    }

    const handleChangeMode = (event) => {
        setMode(event.target.value);
        colorMode.toggleColorMode()
        console.log('handleChangeMode')
    };

    const handleChangeColorPrimary = (color) => {
        setColorPrimary(color);
        colorMode.toggleComponentMode(color)
        // console.log(color)
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
                    <Typography>Modo</Typography>
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
                <Grid item xs={12} md={12}>
                    <Typography>Cor Primaria</Typography>
                    <AvatarGroup 
                        variant="rounded" 
                        sx={{display: 'flex', justifyContent: 'center'}}
                        >
                        <Avatar sx={{ bgcolor: '#004AAD', mr: 2 }}>
                            <Button sx={{width: '100%', height: '100%'}} onClick={() => handleChangeColorPrimary('blue')}>
                                {colorPrimary === 'blue' ? <CheckIcon sx={{color: 'white'}} /> : ''}
                            </Button>
                        </Avatar>
                        <Avatar sx={{ bgcolor: '#FD6809', mr: 2 }}>
                            <Button sx={{width: '100%', height: '100%'}} onClick={() => handleChangeColorPrimary('orange')}>
                                {colorPrimary === 'orange' ? <CheckIcon sx={{color: 'white'}} /> : ''}
                            </Button>
                        </Avatar>
                        <Avatar sx={{ bgcolor: '#716F70', mr: 2 }}>
                            <Button sx={{width: '100%', height: '100%'}} onClick={() => handleChangeColorPrimary('grey')}>
                                {colorPrimary === 'grey' ? <CheckIcon sx={{color: 'white'}} /> : ''}
                            </Button>
                        </Avatar>
                    </AvatarGroup>
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