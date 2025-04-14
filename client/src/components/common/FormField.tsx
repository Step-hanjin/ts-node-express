// FormField.tsx
import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import dayjs, { Dayjs } from 'dayjs';

const getCurrentDatetime = (format: string): Dayjs => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = currentDate.getHours();
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');

  const formattedDatetime = format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', formattedHours)
    .replace('mm', minutes)
    .replace('a', ampm);

  return dayjs(formattedDatetime);
};

interface FormFieldProps {
    item: Column;
    defaultValue: any;
}
const FormField: React.FC<FormFieldProps> = ({ item, defaultValue }) => {
    const { key, name, type } = item;
    if (typeof type === 'object') {
        const { name : typeName, items : menuItems } = type; 
        switch (typeName) {
            case 'selector':
                return (
                    <FormControl required variant="filled" sx={{ minWidth: "100%" }}>
                        <InputLabel id="demo-simple-select-filled-label">{name}</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                                label={item.name}
                                key={item.key}
                                id={item.key}
                                name={item.key}
                                defaultValue={defaultValue?defaultValue:''}
                        >
                            {menuItems.map((row, i) => (
                                <MenuItem 
                                    key={i}
                                    value={row.id}
                                >
                                    {row.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            default:
                return null;
        }
    }
    switch (type) {
        case 'input':
            return (
                <TextField
                    required
                    margin="dense"
                    key={key}
                    id={String(key)}
                    name={String(key)}
                    label={name}
                    type="text"
                    defaultValue={defaultValue}
                    fullWidth
                    variant="filled"
                />
            );
        case 'month':
            return (
                <DemoContainer components={['DateField']}>
                    <DateField
                        label={name}
                        key={key}
                        id={String(key)}
                        name={String(key)}
                        defaultValue={!defaultValue?getCurrentDatetime("YYYY-MM"):dayjs(defaultValue)}
                        format="YYYY-MM"
                        variant="filled"
                    />
                </DemoContainer>
            );
        case 'datetime':
            return (
                <DemoContainer components={['DateTimeField']}>
                    <DateTimeField
                        label={name}
                        key={key}
                        id={String(key)}
                        name={String(key)}
                        defaultValue={!defaultValue?getCurrentDatetime("YYYY/MM/DD hh:mm a"):dayjs(defaultValue)}
                        format="YYYY/MM/DD hh:mm a"
                        variant="filled"
                    />
                </DemoContainer>
            );
        default:
            return null;
    }
};

export default FormField;