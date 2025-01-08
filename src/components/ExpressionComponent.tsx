import { AutoComplete, Typography } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { useState } from "react";
import { useAutoCompleteQuery } from "../hooks/hook";
import { Action, Parameter } from "../types/models";

export interface Props {
    action: Action,
    parameter: Parameter
}

export default function ExpressionComponent({ action, parameter }: Props) {
    const [input, setInput] = useState<string | undefined>(parameter.value_expression?.value);
    const [searchText, setSearchText] = useState('');
    const { data, isLoading, error } = useAutoCompleteQuery({
        customer_id: action.customer_id,
        test_case_id: action.test_case_id,
        source_action_id: action.id,
        source_action_name: action.name,
        source_action_order: action.order,
        latest_input: searchText
    }, {
        enable: searchText.length > 0
    });

    const options = (): DefaultOptionType[] => {

        return data!.map((item) => {
            return ({
                label: item,
                value: item
            } as DefaultOptionType);
        });
    };


    const autoComplete = (): React.ReactNode => {
        console.log(input, data)
        return <AutoComplete
            value={input}
            onChange={(val) => { setInput(val) }}
            options={data ? options() : []}
            onSearch={(value) => { setSearchText(value) }}>
        </AutoComplete>
    }

    const render = (): React.ReactNode => {
        if (parameter.value_expression) {
            return autoComplete();
        } else {
            return <Typography.Text code>-</Typography.Text>
        }
    }

    return <>
        {render()}
    </>
}