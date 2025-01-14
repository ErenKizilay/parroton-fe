import { Badge, Card, Divider, Flex } from "antd";

import { Typography } from 'antd';
import CodeComponent2 from "../../common/components/CodeComponent2";
import Duration from "../../common/components/Duration";
import { ActionExecutionPair } from "../types/actionExecutionTypes";

export interface ActionExecCardProps {
    actionExecution: ActionExecutionPair
}

export default function ActionExecutionCard({ actionExecution }: ActionExecCardProps) {
    const execution = actionExecution.execution;
    const action = actionExecution.action;
    const color = (): string => {
        if (execution.status_code === 0) {
            return "grey";
        }
        if (execution.status_code <= 299) {
            return "green"
        }
        if (execution.status_code <= 599) {
            return "yellow"
        } else {
            return "red"
        }
    }

    const detailComp = (key: string, child: React.ReactNode): React.ReactNode => {
        return <Flex vertical>
            <Typography.Text strong>{key}</Typography.Text>
            {child}
        </Flex>
    }

    return <>
        <Card>
            <Flex gap={3} vertical>
                <Flex vertical>
                    <Flex justify="space-between" align="center" gap={5}>
                        <Badge overflowCount={600} count={execution.status_code} color={color()}></Badge>
                        <Typography.Text strong>{action?.name}</Typography.Text>
                        <Duration start={execution.started_at} end={execution.finished_at} />

                    </Flex>
                    {execution.error ? <Typography.Text type="danger">{execution.error}</Typography.Text> : ''}
                </Flex>
                <Divider />
                <Flex vertical>
                    <Flex>
                        {detailComp("Request params", <CodeComponent2 data={execution.query_params} />)}
                    </Flex>
                    <Flex vertical>
                        {detailComp("Request body", <CodeComponent2 data={execution.request_body} />)}
                        {detailComp("Response", <CodeComponent2 data={execution.response_body} />)}
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    </>
}