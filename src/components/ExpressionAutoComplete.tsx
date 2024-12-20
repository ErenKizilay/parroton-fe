import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useAutoCompleteQuery } from "../hooks/hook";
import { Action } from "../types/models";


export interface Params {
    source: Action,
    expression: string,
}

export default function ExpressionAutoComplete({ source, expression }: Params) {
    const [latestInput, setLatestInput] = useState<string>(expression);
    const [options, setOptions] = useState<string[]>([]);
    useAutoCompleteQuery({
        customer_id: "eren",
        test_case_id: source.test_case_id,
        source_action_id: source.id,
        source_action_name: source.name,
        source_action_order: source.order,
        latest_input: latestInput
    }, {
        onSuccess: (data: string[]) => {
            console.log("options: ", data)
            setOptions(data.map(d => latestInput + d))
        },
        enabled: latestInput.length > 0
    });
    return <>
        <Autocomplete
            freeSolo
            fullWidth
            disableClearable
            defaultValue={expression}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    onChange={(e) => setLatestInput(e.target.value)}
                    label="Choose a country"
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            type: 'search',
                        },
                    }} />
            )}
            options={options}
        >

        </Autocomplete>
    </>
}