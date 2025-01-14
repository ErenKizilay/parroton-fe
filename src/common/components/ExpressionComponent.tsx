import { AutoComplete, Typography } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { useState } from "react";
import { useAutoCompleteQuery } from "../hooks/commonHooks";
import InlineEditComponent from "./InlineEditComponent";

export interface ExpressionProps {
    customer_id: string,
    test_case_id: string,
    action_order: number | null,
    initialInput: string | undefined,
    onSave?: (val: string | undefined) => Promise<any>,
}

export default function ExpressionComponent({ customer_id, test_case_id, action_order, initialInput, onSave }: ExpressionProps) {
    const [input, setInput] = useState<string | undefined>(initialInput);
    const [searchText, setSearchText] = useState('');
    const { data, isLoading, error } = useAutoCompleteQuery({
        customer_id: customer_id,
        test_case_id: test_case_id,
        source_action_order: action_order,
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
        return <AutoComplete
            style={{ minWidth: "300px", width: "100%" }}
            value={input}
            onChange={(val) => {
                setInput(val);
            }}
            options={data ? options() : []}
            onSearch={(value) => { setSearchText(value) }}>
        </AutoComplete>
    }

    const beforeEdit = (): React.ReactNode => {
        return <Typography.Text code editable={false}>{input ? input : `- `}</Typography.Text>
    }

    return <>
        {onSave ? <InlineEditComponent beforeEdit={beforeEdit()} whiledEditing={autoComplete()} mutationFunction={function (): Promise<unknown> {
                return onSave!(input);
            }} />: beforeEdit()
            }

    </>
}