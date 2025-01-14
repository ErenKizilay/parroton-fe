import {
    DeleteTwoTone
} from '@ant-design/icons';
import { Button, Card, Flex, message, Popconfirm, Segmented, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActionList from "../action/components/ActionList";
import AssertionList from "../assertion/components/AssertionList";
import AuthProviderList from "../auth/components/AuthProviderList";
import DataLoaderComponent from "../common/components/DataLoaderComponent";
import RunList from "../run/components/RunList";
import UpdateTestCase from "../testCase/components/UpdateTestCase";
import { useDeleteTestCase, useGetTestCaseQuery } from "../testCase/hooks/testCaseHooks";

export default function TestCasePage() {
    const { id } = useParams();
    const { data, isLoading, error } = useGetTestCaseQuery(id!);
    const [segment, setSegment] = useState("actions");
    const deleteHook = useDeleteTestCase(id!);
    const navigate = useNavigate();

    const segmentContent = (): React.ReactNode => {
        switch (segment) {
            case "actions":
                return <ActionList testCase={data!} />
            case "auth":
                return <AuthProviderList customerId={data?.customer_id!} testCaseId={data?.id!} />
            case "runs":
                return <RunList testCaseId={data?.id!} />
            case "assertions":
                return <AssertionList test_case_id={data?.id!} />
        }
    }

    const handleDelete = () => {
        deleteHook.mutate();
        if (deleteHook.isError) {
            message.error(new String(deleteHook.error));
        } else {
            navigate("/test-cases");
        }
    }

    const render = (): React.ReactNode => {
        return <>
            <Flex vertical>
                <Card loading={isLoading} title={data?.name} extra={
                    <Flex>
                        {data ? <UpdateTestCase id={id!} initialName={data?.name} description={data?.description} /> : ''}
                        <Popconfirm title={"Delete Test Case"} description={"Are you sure to delete test case?"} onConfirm={() => handleDelete()} okText="Yes"
                            cancelText="No">
                            <Button icon={<DeleteTwoTone twoToneColor='#eb2f96' />}></Button>
                        </Popconfirm>
                    </Flex>
                }>
                    <Typography.Paragraph>{data?.description}</Typography.Paragraph>
                </Card>
                <Segmented onChange={(value) => setSegment(value)} options={[{ label: "Actions", value: "actions" }, { label: "Auth Providers", value: "auth" }, { label: "Runs", value: "runs" }, { label: "Assertions", value: "assertions" }]} />
                {segmentContent()}
            </Flex>
        </>
    }

    return <>
        <DataLoaderComponent isLoading={isLoading} error={error} render={render} />
    </>
}