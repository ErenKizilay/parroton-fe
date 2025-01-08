import { Segmented } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ActionList from "../components/ActionList";
import AuthProviderList from "../components/AuthProviderList";
import DataLoaderComponent from "../components/DataLoaderComponent";
import { useGetTestCaseQuery } from "../hooks/hook";
import RunList from "../components/RunList";

export default function TestCasePage() {
    const { id } = useParams();
    const { data, isLoading, error } = useGetTestCaseQuery(id!);
    const [segment, setSegment] = useState("actions");

    const segmentContent = (): React.ReactNode => {
        switch (segment) {
            case "actions":
                return <ActionList testCase={data!} />
            case "auth":
                return <AuthProviderList customerId={data?.customer_id!} testCaseId={data?.id!} />
            case "runs":
                return <RunList testCaseId={data?.id!}/>
        }
    }

    const render = (): React.ReactNode => {
        return <>
            <Segmented onChange={(value) => setSegment(value)} options={[{ label: "Actions", value: "actions" }, { label: "Auth Providers", value: "auth" }, { label: "Runs", value: "runs" }]} />
            {segmentContent()}
        </>
    }

    return <>
        <DataLoaderComponent isLoading={isLoading} error={error} render={render} />
    </>
}