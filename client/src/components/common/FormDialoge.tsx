import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormField from './FormField'; // Import the new FormField component
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

type Props = {
  formData: Row;
  formItems: Column[];
  children: React.ReactNode;
  saveData: (data: TableTypes) => void;
};

const FormDialog: React.FC<Props> = ({
  formData,
  formItems,
  children,
  saveData,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(fData.entries());
    let data: TableTypes = formJson as TableTypes; 
    data.id = formData.id;
    console.log(data);
    saveData(data as TableTypes);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={onSubmit}>
          <DialogTitle>{children}</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {formItems.map((item) => 
                item.key !== 'id' && (
                  <FormField
                    key={item.key}
                    item={item}
                    defaultValue={
                      typeof formData[item.key] === 'object' && formData[item.key] !== null ?
                      (formData[item.key] as JoinObject).id :
                      formData[item.key] as string}
                  />
                )
              )}
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant='contained' type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </ThemeProvider>
  );
};

export default FormDialog;