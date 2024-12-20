import { Box, Card, CardContent, Stack, TextareaAutosize, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { Action, ActionExecution } from "../types/models";

export interface Params {
    action: Action,
    execution: ActionExecution | undefined
}

enum ExecDetailType {
    Query,
    Request,
    Response
}

export default function ActionExecutionComponent({ action, execution }: Params) {
    const [detailType, setDetailType] = useState<ExecDetailType>(ExecDetailType.Request)

    const getDuration = (date1: string, date2: string): number => {
        const asDate1 = new Date(date1);
        const asDate2 = new Date(date2);
        return asDate2.getTime() - asDate1.getTime()
    }

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: ExecDetailType,
    ) => {
        setDetailType(newAlignment);
    };
    const buildDetailContent = (): ReactNode => {
        let data = "";
        switch (detailType) {
            case ExecDetailType.Query:
                data = execution?.query_params ? JSON.stringify(execution?.query_params, null, 2) : '';
                break;
            case ExecDetailType.Request:
                data = execution?.request_body? JSON.stringify(execution?.request_body, null, 2): '';
                break;
            case ExecDetailType.Response:
                data = execution?.response_body? JSON.stringify(execution?.response_body, null, 2): '';
                break;
        }
        return <>
            <TextareaAutosize
                minRows={3}
                maxRows={Infinity}
                value={data}
            />
        </>
    }

    return <>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Stack gap={2} direction={"row"}>
                        <Typography>{action.name}</Typography>
                        <Typography>Status: {execution?.status_code}</Typography>
                        <Typography>Duration: {execution ? `${getDuration(execution?.started_at, execution?.finished_at)} ms` : ''}</Typography>
                        <Typography>Error: {execution?.error ? execution?.error : '-'}</Typography>
                    </Stack>

                    <ToggleButtonGroup
                        value={detailType}
                        exclusive
                        onChange={handleAlignment}>
                        <ToggleButton value={ExecDetailType.Query}>
                            <Typography>Query</Typography>
                        </ToggleButton>
                        <ToggleButton value={ExecDetailType.Request}>
                            <Typography>Body</Typography>
                        </ToggleButton>
                        <ToggleButton value={ExecDetailType.Response}>
                            <Typography>Response</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {buildDetailContent()}
                </CardContent>
            </Card>
        </Box>
    </>
}