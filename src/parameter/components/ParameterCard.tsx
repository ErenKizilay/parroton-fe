import { Card, Col, Divider, Flex, Row, Typography } from "antd"
import { Action } from "../../action"
import CodeComponent2 from "../../common/components/CodeComponent2"
import ExpressionComponent from "../../common/components/ExpressionComponent"
import { updateParameterExpression } from "../hooks/parameterHooks"
import { get_path, Parameter, ParameterType } from "../types/parameterTypes"

export interface ParameterCardProps {
    parameter: Parameter,
    action: Action
}

export default function ParameterCard({ parameter, action }: ParameterCardProps) {

    return <>
        <Card>
            <Flex vertical>
                <Row>
                    <Col span={12}>
                        <Flex flex={1} vertical gap={2}>
                            <Typography.Text>Location</Typography.Text>
                            <Typography.Text strong>{get_path(parameter.location)}</Typography.Text>
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <CodeComponent2 data={parameter.value} />
                    </Col>
                </Row>

                <Divider />
                <Flex vertical>
                    <Typography.Text>Expression</Typography.Text>
                    <ExpressionComponent onSave={parameter.parameter_type === ParameterType.Input ? (value) => {
                        return updateParameterExpression(parameter.test_case_id, parameter.action_id, parameter.id, value);
                    } : undefined} customer_id={action.customer_id} test_case_id={action.test_case_id} action_order={action.order} initialInput={parameter.value_expression?.value} />
                </Flex>
            </Flex>
        </Card>
    </>
}