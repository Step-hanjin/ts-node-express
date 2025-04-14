import React, { useEffect } from "react";
import {
    Box,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper
} from '@mui/material';
import Table from '@mui/material/Table';

// import components
import FormDialog from "./FormDialoge";
import Confirm from "./Confirm";

interface CustomTableProps {
    title: string;
    headerItems: Column[];
    formItems?: Column[];
    tableData: Row[];
    saveRow: (data : TableTypes) => void
    editRow: (data : TableTypes) => void;
    deleteRow: (id : number) => void;
}

const CustomTable = ({
    title,
    headerItems,
    formItems = headerItems,
    tableData,
    saveRow,
    editRow,
    deleteRow,
}: CustomTableProps) => {
    const cols = headerItems.map(item => 
        <TableCell key={item.key}>{item.name}</TableCell>
    );
    
    const rows = tableData.length ? tableData.map(row =>  
        <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >

            {headerItems.map(col => <TableCell key={col.key}>
                {typeof row[col.key] === "object" && row[col.key] !== null
                    ? String((row[col.key] as JoinObject).name)
                    : String(row[col.key])}
                </TableCell>
            )}
            <TableCell>
                <FormDialog
                    formData={row}
                    formItems={formItems}
                    saveData={editRow}
                >
                    <b>Edit</b>
                </FormDialog>
                &nbsp;
                <Confirm
                    data={row}
                    deleteData={deleteRow}
                >
                    Delete
                </Confirm>
            </TableCell>
        </TableRow>
    ) : <TableRow></TableRow>;

    return (
        <Box sx={{ padding: 5 }}>
            <FormDialog
                formData={{} as TableTypes}
                formItems={formItems}
                saveData={saveRow}
            >
                Add {title}
            </FormDialog>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {cols}
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
};

export default CustomTable;