import { Stack } from "@mui/material";
import { useActionQuery } from "../hooks/hook";
import { Action, TestCase } from "../types/models";
import ActionComponent from "./Action";


export interface Props {
    actions: Action[]
}


export default function ActionList({ actions }: Props) {
    return <>
    <Stack width={"%100"}>
        {actions?.map(a => <ActionComponent key={a.id} action={a}/>)}
    </Stack>
    </>
}