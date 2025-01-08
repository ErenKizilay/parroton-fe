import { Card, Typography } from "antd"
import { TestCase } from "../types/models"

export interface Props {
    testCase: TestCase,
    onClick: (testCase: TestCase) => void
}

export default function TestCaseCard({ testCase, onClick }: Props) {
    return <>
        <Card hoverable title={testCase.name} onClick={(e) => onClick(testCase)}>
            <Typography.Text>
                {testCase.description? testCase.description : ''}
            </Typography.Text>
        </Card>
    </>
}