import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { get_path, Parameter } from "../types/models";


export interface Params {
    parameter: Parameter
}

export default function ParameterComponent({ parameter }: Params) {

    const buildParameterLocation = (): ReactNode => {
        return <Box
            sx={{
                bgcolor: 'background.paper', // Adjust based on your theme
                padding: 1,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                fontFamily: 'monospace', // For code-like font
                fontSize: '0.875rem', // Slightly smaller for code
                whiteSpace: 'nowrap', // Prevent wrapping
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
        >
            <Typography component="span">{get_path(parameter.location)}</Typography>
        </Box>
    }

    return <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Path</TableCell>
                        <TableCell align="right">Expression</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                    //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="parameter">
                            {buildParameterLocation()}
                        </TableCell>
                        <TableCell align="right"><TextField fullWidth value={parameter.value_expression ? parameter.value_expression.value : '-'}></TextField>
                        </TableCell>
                        <TableCell align="right">{JSON.stringify(parameter.value)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>
}