import { Button, Card, Flex, message, Popconfirm, Segmented, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActionList from "../components/ActionList";
import AuthProviderList from "../components/AuthProviderList";
import DataLoaderComponent from "../components/DataLoaderComponent";
import RunList from "../components/RunList";
import { useDeleteTestCase, useGetTestCaseQuery } from "../hooks/hook";

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
                    <Popconfirm title={"Delete Test Case"} description={"Are you sure to delete test case?"} onConfirm={() => handleDelete()} okText="Yes"
                        cancelText="No">
                        <Button danger>Delete</Button>
                    </Popconfirm>
                }>
                    <Flex gap={2} vertical>
                        <Typography.Text>{data?.description}</Typography.Text>
                        <Segmented onChange={(value) => setSegment(value)} options={[{ label: "Actions", value: "actions" }, { label: "Auth Providers", value: "auth" }, { label: "Runs", value: "runs" }]} />
                        {segmentContent()}
                    </Flex>
                </Card>
            </Flex>
        </>
    }

    return <>
        <DataLoaderComponent isLoading={isLoading} error={error} render={render} />
    </>
}