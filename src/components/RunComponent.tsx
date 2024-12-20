import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardActions, CardContent, Collapse, Stack, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { useActionExectionsQuery, useRunQuery } from "../hooks/hook";
import { Action, ActionExecution, Run, RunStatus } from "../types/models";
import ActionExecutionComponent from './ActionExecution';
import { ExpandMore } from "./ExpandMoreButton";


export interface Params {
    testCaseId: string
    runId: string
    actions: Action[]
}

export default function RunComponent({ testCaseId, runId, actions }: Params) {
    const [run, setRun] = useState<Run>();
    const [executions, setExecutions] = useState<ActionExecution[]>([]);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    useRunQuery(testCaseId, runId, {
        refetchInterval: 3000,
        enabled: !run || run.status === RunStatus.InProgress,
        onSuccess(data: Run) {
            console.log("data run: {}", data);
            setRun(data);
        }
    });
    const { data: actionExecutions } = useActionExectionsQuery(testCaseId, runId, {
        refetchInterval: 1000,
        enabled: run?.status === RunStatus.InProgress || (executions.length === 0 && showDetails),
        onSuccess(data: ActionExecution[]) {
            setExecutions(data)
        }
    });

    const handleExpandClick = () => {
        setShowDetails(!showDetails);
    };

    const buildExecutionContent = (action: Action): ReactNode => {
        const exec = executions.find(exec => exec.action_id === action.id);
        return <>
            <ActionExecutionComponent action={action} execution={exec}></ActionExecutionComponent>
        </>
    }

    const getDuration = (date1: string, date2: string): number => {
        const asDate1 = new Date(date1);
        const asDate2 = new Date(date2);
        return asDate2.getTime() - asDate1.getTime()
    }

    return <>
        <Card sx={{ width: "%100" }}>
            <CardContent>
                <Stack gap={2} direction={"row"}>
                    <Typography>Status: {run?.status}</Typography>
                    <Typography>Duration: {run && run.finished_at ? `${getDuration(run?.started_at, run?.finished_at)} ms` : ''}</Typography>
                </Stack>

            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={showDetails}
                    onClick={handleExpandClick}
                    aria-expanded={showDetails}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={showDetails} timeout="auto" unmountOnExit>
                <CardContent>
                    <Stack>
                        {actions.map(a => buildExecutionContent(a))}
                    </Stack>
                </CardContent>
            </Collapse>
        </Card>
    </>
}