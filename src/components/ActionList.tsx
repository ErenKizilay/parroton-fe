import React from "react";
import { useActionQuery } from "../hooks/hook";
import { TestCase } from "../types/models";
import DataLoaderComponent from "./DataLoaderComponent";
import ActionCard from "./ActionCard";
import { Collapse, Typography } from "antd";
import ActionContainer from "./ActionContainer";

export interface Props {
    testCase: TestCase
}

export default function ActionList({ testCase }: Props) {
    const {data, isLoading, error} = useActionQuery({
        test_case_id: testCase.id
    });
    const render = ():React.ReactNode => {
        const items = data?.items.map(i => {
            return {
                key: i.id,
                label: <ActionCard action={i}/>,
                children: <ActionContainer action={i}/>
            }
        });
        return <Collapse items={items}/>
    }
    return <>
    <DataLoaderComponent isLoading={isLoading} error={error} render={render}/>
    </>
}