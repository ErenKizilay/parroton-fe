import { Button, Col, Empty, Flex, Row, Typography } from "antd"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import DataLoaderComponent from "../../common/components/DataLoaderComponent"
import RunCard from "./RunCard"
import RunContainer from "./RunContainer"
import { mutateRun, queryRuns } from "../hooks/runHooks"
import {ThunderboltOutlined} from '@ant-design/icons';

export interface RunListProps {
    testCaseId: string,

}

export default function RunList({ testCaseId }: RunListProps) {
    const [selectedRunId, setSelectedRunId] = useState<string | undefined>();
    const { data, isLoading, error } = useQuery(`runs_${testCaseId}`, () => queryRuns(testCaseId));
    const queryClient = useQueryClient();
    const startRun = useMutation(() => mutateRun(testCaseId), {
        onSuccess(data) {
            setSelectedRunId(data.id);
            queryClient.invalidateQueries(`runs_${testCaseId}`);
        },
    });

    const runList = (): React.ReactNode => {
        return <Flex vertical>
            {data?.items.map(i =>
                <RunCard styles={{
                    borderColor: i.id === selectedRunId ? "black": undefined
                }} key={i.id} run={i} onClick={(id) => {
                    setSelectedRunId(id);
                }} />
            )}
        </Flex>
    }

    const selectedRun = (): React.ReactNode => {
        if (selectedRunId) {
            return <RunContainer key={selectedRunId} testCaseId={testCaseId} runId={selectedRunId} />
        } else {
            if(data && data.items.length === 0) {
                return <Empty description={<Typography.Text>No run started yet!</Typography.Text>}/>
            }
            return <Empty description={<Typography.Text>Select run to see details</Typography.Text>}/>
        }
    }

    return <Row gutter={6}>
        <Col span={6}>
            <Flex gap={3} vertical>
                <Button type="primary" icon={<ThunderboltOutlined />} onClick={(e) => {
                    startRun.mutate();
                }}>New run</Button>
                <DataLoaderComponent isLoading={isLoading} error={error} render={runList} />
            </Flex>
        </Col>
        <Col span={18}>
            {selectedRun()}
        </Col>
    </Row>
}