import { Flex, Segmented } from "antd";
import { useState } from "react";
import { useParameterQuery } from "../hooks/hook";
import { Action, ParameterIn, ParameterType } from "../types/models";
import DataLoaderComponent from "./DataLoaderComponent";
import ParameterCard from "./ParameterCard";

export interface Props {
    action: Action
}

export default function ActionContainer({ action }: Props) {
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
            {data?.items.map(i => {
                return <ParameterCard key={i.id} action={action} parameter={i} />
            })}
        </Flex>
    }

    const onParameterTypeChange = (value: string) => {
        setParameterIn(ParameterIn.Body);
        value === "input" ? setParameterType(ParameterType.Input) : setParameterType(ParameterType.Output)
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
            <Segmented options={["input", "output"]} onChange={(value) => onParameterTypeChange(value)} />
            <Segmented onChange={(value) => onParameterInChange(value)} options={parameterType === ParameterType.Input ? ["body", "param", "header"] : ["body", "header"]} />
            <DataLoaderComponent isLoading={isLoading} error={error} render={segmentContent} />
        </Flex>
    </>
}