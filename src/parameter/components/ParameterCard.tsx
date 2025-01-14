import { Card, Divider, Flex, Typography } from "antd"
import CodeComponent from "../../common/components/CodeComponent"
import ExpressionComponent from "../../common/components/ExpressionComponent"
import { get_path, Parameter, ParameterType } from "../types/parameterTypes"
import { updateParameterExpression } from "../hooks/parameterHooks"
import { Action } from "../../action"
import CodeComponent2 from "../../common/components/CodeComponent2"

export interface ParameterCardProps {
    parameter: Parameter,
    action: Action
}

export default function ParameterCard({ parameter, action }: ParameterCardProps) {

    return <>
        <Card>
            <Flex vertical>
                <Flex justify="space-between">
                    <Flex flex={1} vertical gap={2}>
                        <Typography.Text>Location</Typography.Text>
                        <Typography.Text strong>{get_path(parameter.location)}</Typography.Text>
                    </Flex>
                    <CodeComponent2 data={parameter.value} />
                </Flex>
                <Divider />
                <Flex vertical>
                    <Typography.Text>Expression</Typography.Text>
                    <ExpressionComponent onSave={parameter.parameter_type === ParameterType.Input ? (value) => {
                        return updateParameterExpression(parameter.test_case_id, parameter.action_id, parameter.id, value);
                    }: undefined} customer_id={action.customer_id} test_case_id={action.test_case_id} action_order={action.order} initialInput={parameter.value_expression?.value} />
                </Flex>
            </Flex>
        </Card>
    </>
}