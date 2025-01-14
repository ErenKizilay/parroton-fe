import { Badge, Flex, Typography } from "antd";
import Duration from "../../common/components/Duration";
import { ActionExecutionPair } from "../types/actionExecutionTypes";

export interface ActionExecItemCardProps {
    actionExecution: ActionExecutionPair
}

export default function ActionExecutionItem({ actionExecution }: ActionExecItemCardProps) {
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

    return <Flex justify="space-between" align="center" gap={5}>
        <Badge overflowCount={600} count={execution.status_code} color={color()}></Badge>
        <Typography.Text strong>{action?.name}</Typography.Text>
        <Duration start={execution.started_at} end={execution.finished_at} />

    </Flex>
}