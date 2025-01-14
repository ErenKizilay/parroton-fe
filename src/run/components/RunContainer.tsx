import { Collapse, Flex, Segmented, Typography } from "antd"
import React, { useState } from "react"
import { useQuery } from "react-query"
import { ActionExecutionPair, queryActionExecutions } from "../../actionExecution"
import ActionExecutionDetails from "../../actionExecution/components/ActionExecutionDetails"
import ActionExecutionItem from "../../actionExecution/components/ActionExecutionItem"
import { useBatchAssertionsQuery } from "../../assertion"
import AssertionResultComponent from "../../assertion/components/AssertionResultComponent"
import DataLoaderComponent from "../../common/components/DataLoaderComponent"
import { queryRun } from "../hooks/runHooks"
import { Run, RunStatus } from "../types/runTypes"
import RunCard from "./RunCard"
import AssertionSummary from "../../assertion/components/AssertionSummary"

export interface RunContainerProps {
    testCaseId: string,
    runId: string
}

export default function RunContainer({ testCaseId, runId }: RunContainerProps) {
    const [run, setRun] = useState<Run | null>(null);
    const [actionExecutions, setActionExecutions] = useState<ActionExecutionPair[]>([]);
    const { data: assertionBatch, isLoading: assertionsLoading, error: assertionLoadError } = useBatchAssertionsQuery(testCaseId, run && run.assertion_results ? run.assertion_results.map(a => a.assertion_id) : [])
    const [segment, setSegment] = useState("executions");
    const { isLoading, error } = useQuery(`${testCaseId}_${runId}_runs`, () => queryRun(testCaseId, runId), {
        enabled: run === null || (run?.status === RunStatus.InProgress),
        refetchInterval: 1000,
        onSuccess(data) {
            setRun(data);
        },
    });

    const { isLoading: execLoads, error: execFetchError } = useQuery(`${testCaseId}_${runId}`, () => queryActionExecutions(testCaseId, runId), {
        enabled: run !== null && (run?.status === RunStatus.InProgress || actionExecutions.length === 0),
        refetchInterval: 1000,
        onSuccess(data) {
            setActionExecutions(data)
        },
    });

    const execItems = (): React.ReactNode => {
        const items = actionExecutions?.map(i => {
            return {
                key: i.execution.id,
                label: <ActionExecutionItem actionExecution={i} />,
                children: <ActionExecutionDetails execution={i.execution} />
            }
        });
        return <Collapse items={items} />
    }

    const assertionResults = (): React.ReactNode => {
        const items = run?.assertion_results?.map(ar => {
            return {
                key: ar.assertion_id,
                label: <AssertionSummary result={ar} assertion={assertionBatch?.find(a=>a.id === ar.assertion_id)}/>,
                children: <AssertionResultComponent key={ar.assertion_id} testCaseId={testCaseId} assertionResult={ar} assertion={assertionBatch?.find(a=>a.id === ar.assertion_id)} />
            }
        });
        return <Collapse items={items} />
    }


    const segmentContent = (): React.ReactNode => {
        switch (segment) {
            case "executions":
                return <DataLoaderComponent isLoading={execLoads} error={execFetchError} render={execItems} />;
            case "assertions":
                return <DataLoaderComponent isLoading={assertionsLoading} error={assertionLoadError} render={assertionResults} />
        }
    }

    const render = (): React.ReactNode => {
        if (run) {
            return <Flex vertical>
                <RunCard run={run} />
                <Segmented onChange={(value) => setSegment(value)} options={[{ label: "Executions", value: "executions" }, { label: "Assertions", value: "assertions" }]} />
                {segmentContent()}
            </Flex>
        } else {
            return <Typography.Text>run is null!</Typography.Text>
        }

    }


    return <DataLoaderComponent isLoading={isLoading} error={error} render={render} />
}