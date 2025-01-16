import { Flex, Typography } from "antd";
import CodeComponent2 from "../../common/components/CodeComponent2";
import { ActionExecution } from "../types/actionExecutionTypes";

export interface ActionExecDetailsProps {
    execution: ActionExecution
}

export default function ActionExecutionDetails({ execution }: ActionExecDetailsProps) {
    const detailComp = (key: string, child: React.ReactNode): React.ReactNode => {
        return <Flex vertical>
            <Typography.Text strong>{key}</Typography.Text>
            {child}
        </Flex>
    }

    return <Flex gap={3} vertical>
        <Flex vertical>
            {execution.error ? <Typography.Text code type="danger">{execution.error}</Typography.Text> : ''}
            <Flex>
                {detailComp("Request params", <CodeComponent2 data={execution.query_params} />)}
            </Flex>
            <Flex vertical>
                {detailComp("Request body", <CodeComponent2 data={execution.request_body} />)}
                {detailComp("Response", <CodeComponent2 data={execution.response_body} />)}
            </Flex>
        </Flex>
    </Flex>
}