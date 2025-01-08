import { Flex, Typography } from "antd"
import { useState } from "react"
import { useQuery } from "react-query"
import { queryActionExecutions, queryRun } from "../hooks/hook"
import { ActionExecutionPair, Run, RunStatus } from "../types/models"
import ActionExecutionCard from "./ActionExecutionCard"
import DataLoaderComponent from "./DataLoaderComponent"
import RunCard from "./RunCard"

export interface Props {
    testCaseId: string,
    runId: string
}

export default function RunContainer({ testCaseId, runId }: Props) {
    const [run, setRun] = useState<Run | null>(null);
    const [actionExecutions, setActionExecutions] = useState<ActionExecutionPair[]>([]);
    const { isLoading, error } = useQuery(`${testCaseId}_${runId}_runs`, () => queryRun(testCaseId, runId), {
        enabled: run === null || (run?.status === RunStatus.InProgress),
        refetchInterval: 1000,
        onSuccess(data) {
            setRun(data);
        },
    });

    const { isLoading: execLoads } = useQuery(`${testCaseId}_${runId}`, () => queryActionExecutions(testCaseId, runId), {
        enabled: run !== null && (run?.status === RunStatus.InProgress || actionExecutions.length === 0),
        refetchInterval: 1000,
        onSuccess(data) {
            setActionExecutions(data)
        },
    });

    const render = (): React.ReactNode => {
        if (run) {
            return <Flex vertical>
                <Flex vertical>
                    <RunCard run={run} />
                    {actionExecutions.map(exec => <ActionExecutionCard key={exec.execution.id} actionExecution={exec} />)}
                </Flex>
            </Flex>
        } else {
            return <Typography.Text>run is null!</Typography.Text>
        }

    }


    return <DataLoaderComponent isLoading={isLoading} error={error} render={render} />
}