import { Badge, Card, Flex, Tag } from "antd";
import { ActionExecutionPair } from "../types/models";

import { Typography } from 'antd';
import CodeComponent from "./CodeComponent";
import Duration from "./Duration";

export interface Props {
    actionExecution: ActionExecutionPair
}

export default function ActionExecutionCard({ actionExecution }: Props) {
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

    const detailComp = (key: string, keyColor: string | undefined, child: React.ReactNode): React.ReactNode => {
        return <Flex vertical>
            <Tag color={keyColor}>
                {key}
            </Tag>
            {child}
        </Flex>
    }

    return <>
        <Card>
            <Flex gap={3} vertical>
                <Flex justify="space-between" align="center" gap={5}>
                    <Badge overflowCount={600} count={execution.status_code} color={color()}></Badge>
                    <Typography.Text strong>{action?.name}</Typography.Text>
                    <Duration start={execution.started_at} end={execution.finished_at} />
                </Flex>
                <Flex gap={5}>
                    {detailComp("Request body", undefined, <CodeComponent data={execution.request_body} />)}
                    {detailComp("Request params", undefined, <CodeComponent data={execution.query_params} />)}
                    {detailComp("Response", undefined, <CodeComponent data={execution.response_body} />)}
                    {detailComp("Error", "red", <Typography.Text type="danger">{execution.error}</Typography.Text>)}
                </Flex>
            </Flex>
        </Card>
    </>
}