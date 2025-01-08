import { Flex, Result, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import DataLoaderComponent from "../components/DataLoaderComponent";
import TestCaseCard from "../components/TestCaseCard";
import { useTestCaseQuery } from "../hooks/hook";

export default function TestCaseListPage() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useTestCaseQuery("asdasd");

    const content = (): React.ReactNode => {
        if (isLoading) {
            return <Skeleton>

            </Skeleton>
        }
        if (error) {
            <Result
                status="error"
                title="Could not get test cases!"
                subTitle={new String(error)}
            />
        }
        if (data) {
            return <Flex align="stretch" justify="stretch" gap={2}>
                {
                    data.items.map(i => {
                        return <>
                            <TestCaseCard key={i.id} testCase={i} onClick={(tc) => { navigate(`/test-cases/${tc.id}`) }}></TestCaseCard>
                        </>
                    })
                }
            </Flex>
        }
    }
    return <>
        <DataLoaderComponent isLoading={isLoading} error={error} render={() => {
            return <Flex align="stretch" justify="stretch" gap={2}>
                {
                    data?.items.map(i => {
                        return <>
                            <TestCaseCard key={i.id} testCase={i} onClick={(tc) => { navigate(`/test-cases/${tc.id}`) }}></TestCaseCard>
                        </>
                    })
                }
            </Flex>
        }} ></DataLoaderComponent>
    </>
}