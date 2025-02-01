import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Col, Row, Tag, Typography } from "antd";
import React from 'react';
import CodeComponent2 from '../../common/components/CodeComponent2';
import { Assertion, AssertionItem, AssertionResult } from "../types/assertionTypes";

export interface AssertionSummaryProps {
    result: AssertionResult | undefined,
    assertion: Assertion | undefined,
}

export default function AssertionSummary({ result = undefined, assertion }: AssertionSummaryProps) {

    const details = (): React.ReactNode => {
        if (assertion) {
            return <Row gutter={3} align={"middle"}>
                <Col span={1}>
                    {result ? result.success ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#eb2f96" /> : ''}
                </Col>
                <Col span={10}>
                    {itemSummary(assertion.left)}
                </Col>
                <Col span={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Tag>{assertion.comparison_type}</Tag>
                </Col>
                <Col span={10}>
                    {itemSummary(assertion.right)}
                </Col>
            </Row>
        } else {
            return <Typography.Text>Deleted</Typography.Text>
        }
    }

    const itemSummary = (item: AssertionItem): React.ReactNode => {
        if (item.value_provider) {
            return <CodeComponent2 data={item.value_provider.expression ? item.value_provider.expression.value : item.value_provider.value} copyable={false} />
        }
        return "null"
    }

    return details();
}