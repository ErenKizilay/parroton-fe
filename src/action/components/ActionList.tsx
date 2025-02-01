import { Collapse } from "antd";
import React from "react";
import DataLoaderComponent from "../../common/components/DataLoaderComponent";
import { TestCase } from "../../testCase";
import { useActionQuery } from "../hooks/actionHooks";
import ActionCard from "./ActionCard";
import ActionContainer from "./ActionContainer";

export interface Props {
    testCase: TestCase
}

export default function ActionList({ testCase }: Props) {
    const { data, isLoading, error } = useActionQuery({
        test_case_id: testCase.id
    });
    const render = (): React.ReactNode => {
        const items = data?.items.map(i => {
            return {
                key: i.id,
                label: <ActionCard action={i} />,
                children: <ActionContainer action={i} />
            }
        });
        return <Collapse size="large" items={items} />
    }
    return <>
        <DataLoaderComponent isLoading={isLoading} error={error} render={render} />
    </>
}