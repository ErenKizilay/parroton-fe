import { Button, Col, Flex, Row, Typography } from "antd"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { mutateRun, queryRuns } from "../hooks/hook"
import DataLoaderComponent from "./DataLoaderComponent"
import RunCard from "./RunCard"
import RunContainer from "./RunContainer"

export interface Props {
    testCaseId: string
}

export default function RunList({ testCaseId }: Props) {
    const [selectedRunId, setSelectedRunId] = useState<string | undefined>();
    const { data, isLoading, error } = useQuery(testCaseId, () => queryRuns(testCaseId));
    const startRun = useMutation(() => mutateRun(testCaseId), {
        onSuccess(data) {
            setSelectedRunId(data.id)
        },
    });

    const runList = (): React.ReactNode => {
        return <Flex vertical>
            {data?.items.map(i =>
                <RunCard key={i.id} run={i} onClick={(id) => {
                    console.log("callback for run selection: " + id);
                    setSelectedRunId(id);
                }} />
            )}
        </Flex>
    }

    const selectedRun = (): React.ReactNode => {
        if (selectedRunId) {
            return <RunContainer key={selectedRunId} testCaseId={testCaseId} runId={selectedRunId} />
        } else {
            return <Typography.Text>Select run to see details</Typography.Text>
        }
    }

    return <Row>
        <Col span={6}>
            <Flex vertical>
                <Button onClick={(e) => {
                    startRun.mutate();
                }}>New run</Button>
                <DataLoaderComponent isLoading={isLoading} error={error} render={runList} />
            </Flex>
        </Col>
        <Col span={12}>
            {selectedRun()}
        </Col>
    </Row>
}