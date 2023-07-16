import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setAlertDialog, setResultAlertDialog }) {

    const handleCancel = () => {
        setAlertDialog(false);
        setResultAlertDialog(false)
    };

    const handleSave = () => {
        setResultAlertDialog(true)
        setAlertDialog(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCancel}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Tem certeza que deseja prosseguir?"}</DialogTitle>
                {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {messageAlertDialog}
          </DialogContentText>
        </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleCancel}>Não</Button>
                    <Button onClick={handleSave}>Sim</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}