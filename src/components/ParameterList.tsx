import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { useParameterQuery } from "../hooks/hook";
import { Action, get_path, ParameterIn, ParameterType } from "../types/models";
import ExpressionAutoComplete from "./ExpressionAutoComplete";


export interface Props {
    action: Action,
    parameter_type: ParameterType,
}

export default function ParameterList({ action, parameter_type }: Props) {
    const [paramIn, setParamIn] = useState<ParameterIn>(ParameterIn.Query)
    const { data: parameters, isLoading, error } = useParameterQuery({
        test_case_id: action.test_case_id,
        action_id: action.id,
        parameter_type: parameter_type,
        parameter_in: paramIn
    });

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: ParameterIn,
    ) => {
        setParamIn(newAlignment);
    };

    return <>
        <Stack alignItems={"center"}>
            <ToggleButtonGroup
                value={paramIn}
                exclusive
                onChange={handleAlignment}>
                <ToggleButton value={ParameterIn.Query}>
                    <Typography>Query</Typography>
                </ToggleButton>
                <ToggleButton value={ParameterIn.Body}>
                    <Typography>Body</Typography>
                </ToggleButton>
                <ToggleButton value={ParameterIn.Header}>
                    <Typography>Header</Typography>
                </ToggleButton>
            </ToggleButtonGroup>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Path</TableCell>
                            {parameter_type === ParameterType.Input ? <TableCell>Expression</TableCell> : ''}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {parameters?.sort((p1, p2) => get_path(p1.location).localeCompare(get_path(p2.location)))
                            .map(parameter => <TableRow
                            >
                                <TableCell component="th" scope="parameter">
                                    {get_path(parameter.location)}
                                </TableCell>
                                <>
                                    {parameter_type === ParameterType.Input ? <TableCell align="right">
                                        {parameter.value_expression ?
                                            <ExpressionAutoComplete source={action} expression={parameter.value_expression.value} /> : '-'}
                                    </TableCell> : ''}
                                </>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    </>
}