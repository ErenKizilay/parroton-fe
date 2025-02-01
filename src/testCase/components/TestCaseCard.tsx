import { Card, Typography } from "antd"
import { TestCase } from "../types/testCaseTypes"

export interface TestCaseCarProps {
    testCase: TestCase,
    onClick: (testCase: TestCase) => void
}

export default function TestCaseCard({ testCase, onClick }: TestCaseCarProps) {
    return <>
        <Card id={testCase.id} style={{
            minWidth: "400px",
            maxWidth: "400px",
        }} hoverable title={testCase.name}
            onClick={(e) => onClick(testCase)}>
            <Typography.Text>
                {testCase.description ? testCase.description : ''}
            </Typography.Text>
        </Card>
    </>
}