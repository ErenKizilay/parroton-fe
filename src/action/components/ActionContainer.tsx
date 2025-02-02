import { Empty, Flex, Segmented } from "antd";
import { useState } from "react";
import CodeComponent2 from "../../common/components/CodeComponent2";
import DataLoaderComponent from "../../common/components/DataLoaderComponent";
import { ParameterIn, ParameterType, useParameterQuery } from "../../parameter";
import ParameterCard from "../../parameter/components/ParameterCard";
import { Action } from "../types/actionTypes";

export interface ActionContainerProps {
    action: Action
}

export default function ActionContainer({ action }: ActionContainerProps) {
    const [parameterType, setParameterType] = useState<ParameterType>(ParameterType.Input);
    const [parameterIn, setParameterIn] = useState<ParameterIn>(ParameterIn.Body);
    const { data, isLoading, error } = useParameterQuery({
        test_case_id: action.test_case_id,
        action_id: action.id,
        parameter_type: parameterType,
        parameter_in: parameterIn
    })

    const segmentContent = (): React.ReactNode => {
        return <Flex vertical>
            {data?.items.length === 0 ? <Empty /> : ''}
            {data?.items.map(i => {
                return <ParameterCard key={i.id} action={action} parameter={i} />
            })}
        </Flex>
    }

    const onParameterTypeChange = (value: string) => {
        setParameterIn(ParameterIn.Body);
        value === "input" ? setParameterType(ParameterType.Input) : setParameterType(ParameterType.Output);
    }

    const onParameterInChange = (value: string) => {
        if (value === "body") {
            setParameterIn(ParameterIn.Body);
        }
        if (value === "param") {
            setParameterIn(ParameterIn.Query);
        }
        if (value === "header") {
            setParameterIn(ParameterIn.Header);
        }
    }

    return <>
        <Flex vertical>
            <CodeComponent2 data={action.url} />
            <Segmented options={["input", "output"]} onChange={(value) => onParameterTypeChange(value)} />
            <Segmented onChange={(value) => onParameterInChange(value)} options={parameterType === ParameterType.Input ? ["body", "param", "header"] : ["body", "header"]} />
            <DataLoaderComponent isLoading={isLoading} error={error} render={segmentContent} />
        </Flex>
    </>
}