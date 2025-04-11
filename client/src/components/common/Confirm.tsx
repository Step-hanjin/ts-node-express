import * as React from 'react';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

type Props = {
    data: Row;
    children: any;
    deleteData: (id: number) => void
}
  
export default function Confirm({
  data,
  children,
  deleteData
}: Props) {
    const dispatch: Dispatch<any> = useDispatch();

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   const onClickYes = () => {
    deleteData(data.id!);
    handleClose();
   }
   

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: 500, paddingBlock: 2, paddingInline: 1}}>
            <DialogTitle id="alert-dialog-title">
            {"Delete data?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Do you want to delete this row?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button variant="contained" onClick={onClickYes} autoFocus>
                Yes
            </Button>
            </DialogActions>

        </Box>
      </Dialog>
    </React.Fragment>
  );
}
