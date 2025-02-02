import { Button, Flex, message } from "antd";
import React, { useState } from "react";
import { MutationFunction, useMutation } from "react-query";
import {
    EditOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';

export interface InlineEditProps {
    beforeEdit: React.ReactNode,
    whiledEditing: React.ReactNode,
    mutationFunction: MutationFunction,
    onCancel: () => void
}

export default function InlineEditComponent({beforeEdit, whiledEditing, mutationFunction, onCancel}: InlineEditProps) {
    const[editing, setEditing] = useState(false);
    const mutateHook = useMutation(mutationFunction, {
        onSuccess() {
            message.success("success!");
            setEditing(false);
        },
        onError(error) {
            message.error("failed to update: " + new String(error));
        }
    })

    const render = ():React.ReactNode => {
        if(editing) {
            return <Flex>
                {whiledEditing}
                <Button icon={<CheckCircleOutlined />} onClick={() => {mutateHook.mutate([])}}/>
                <Button icon={<CloseCircleOutlined />} onClick={() => {
                    setEditing(false);
                    onCancel();
                }}/>
            </Flex>
        } else {
            return <Flex>
                {beforeEdit}
                <Button size="small" icon={<EditOutlined/>} onClick={() => {setEditing(true)}}/>
            </Flex>
        }
    }

    return render();

}