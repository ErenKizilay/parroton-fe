import { Button, Empty, Flex, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import DataLoaderComponent from "../common/components/DataLoaderComponent";
import TestCaseCard from "../testCase/components/TestCaseCard";
import { useTestCaseQuery } from "../testCase/hooks/testCaseHooks";

export default function TestCaseListPage() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useTestCaseQuery("eren");

    const empty = (): React.ReactNode => {
        return <Empty
            description={
                <Typography.Text>
                    There is no TestCase yet.
                </Typography.Text>
            }
        >
            <Button onClick={(e) => {navigate("/upload")}} type="primary">Create Now</Button>
        </Empty>
    }

    const render = (): React.ReactNode => {
        return <Flex align="center" gap={2}>
            {
                data?.items.length === 0 ? empty() :
                    data?.items.map(i => {
                        return <>
                            <TestCaseCard key={i.id} testCase={i} onClick={(tc) => { navigate(`/test-cases/${tc.id}`) }}/>
                        </>
                    })
            }
        </Flex>
    }

    return <>
        <DataLoaderComponent isLoading={isLoading} error={error} render={render} ></DataLoaderComponent>
    </>
}