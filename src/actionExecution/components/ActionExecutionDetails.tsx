import { Col, Divider, Flex, Row, Typography } from "antd";
import React from "react";
import CodeComponent2 from "../../common/components/CodeComponent2";
import { ActionExecution } from "../types/actionExecutionTypes";

export interface ActionExecDetailsProps {
    execution: ActionExecution
}

export default function ActionExecutionDetails({ execution }: ActionExecDetailsProps) {
    const detailComp = (key: string, child: React.ReactNode): React.ReactNode => {
        return <Flex style={{ width: "100%" }} vertical>
            <Typography.Text strong>{key}</Typography.Text>
            {child}
        </Flex>
    }

    const requestParamsContent = (): React.ReactNode => {
        return <Flex vertical>
            {execution.query_params.map(([key, value]) => {
                return <Row>
                    <Col span={12}>
                        <CodeComponent2 data={key} />
                    </Col>
                    <Col span={12}>
                        <CodeComponent2 data={value} />
                    </Col>
                </Row>
            })}
            <Divider />
        </Flex>
    }

    return <Flex gap={3} vertical>
        <Flex vertical>
            {execution.error ? <Typography.Text code type="danger">{execution.error}</Typography.Text> : ''}
            <Flex vertical>
                {execution.query_params.length === 0 ? '' : detailComp("Request params", requestParamsContent())}
                {detailComp("Request body", <CodeComponent2 data={execution.request_body} copyable={true} />)}
                <Divider/>
                {detailComp("Response", <CodeComponent2 data={execution.response_body} copyable={true} />)}
            </Flex>
        </Flex>
    </Flex>
}