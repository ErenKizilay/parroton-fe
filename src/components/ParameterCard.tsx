import { Card, Divider, Flex, Typography } from "antd"
import { Action, get_path, Parameter } from "../types/models"
import CodeComponent from "./CodeComponent"
import ExpressionComponent from "./ExpressionComponent"

export interface Props {
    parameter: Parameter,
    action: Action
}

export default function ParameterCard({ parameter, action }: Props) {
    return <>
        <Card>
            <Flex vertical>
                <Flex justify="space-between">
                    <Flex vertical gap={2}>
                        <Typography.Text>Location</Typography.Text>
                        <Typography.Text strong>{get_path(parameter.location)}</Typography.Text>
                    </Flex>
                    <CodeComponent data={parameter.value} />
                </Flex>
                <Divider />
                <Flex vertical>
                    <Typography.Text>Expression</Typography.Text>
                    <ExpressionComponent action={action} parameter={parameter} />
                </Flex>
            </Flex>
        </Card>
    </>
}