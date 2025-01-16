import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Flex, Tag, Typography } from "antd";
import React from 'react';
import { Assertion, AssertionItem, AssertionResult } from "../types/assertionTypes";

export interface AssertionSummaryProps {
    result: AssertionResult | undefined,
    assertion: Assertion | undefined,
}

export default function AssertionSummary({ result = undefined, assertion }: AssertionSummaryProps) {

    const details = (): React.ReactNode => {
        if (assertion) {
            return <Flex align="center" justify="space-between">
                {itemSummary(assertion.left)}
                <Tag>{assertion.comparison_type}</Tag>
                {itemSummary(assertion.right)}
            </Flex>
        } else {
            return <Typography.Text>Deleted</Typography.Text>
        }
    }

    const itemSummary = (item: AssertionItem): React.ReactNode => {
        if (item.value_provider) {
            return <Typography.Text code>{item.value_provider.expression ? item.value_provider.expression.value : item.value_provider.value}</Typography.Text>
        }
        return "null"
    }

    const render = (): React.ReactNode => {
        if (result) {
            return <Flex gap={3}>
                {result.success ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#eb2f96" />}
                {details()}
            </Flex>
        }
        else {
            return details();
        }
    }

    return render();
}