import { Empty, Flex, Tag, Typography } from "antd";
import { Assertion, AssertionResult } from "../types/assertionTypes";
import AssertionComponent from "./AssertionComponent";


export interface AssertionResultProps {
    testCaseId: string,
    assertionResult: AssertionResult,
    assertion: Assertion | undefined,
}

export default function AssertionResultComponent({ testCaseId, assertionResult, assertion }: AssertionResultProps) {


    const render = (): React.ReactNode => {
        return <Flex vertical>
            {assertionResult.success ? '' : <Tag color="red">{assertionResult.message}</Tag>}
            {assertion ? <AssertionComponent test_case_id={testCaseId} assertion={assertion} /> :
                <Empty description={<Typography.Text type="danger">Assertion is deleted!</Typography.Text>} />
            }
        </Flex>
    }

    return render()
}