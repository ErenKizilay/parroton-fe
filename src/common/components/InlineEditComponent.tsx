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
}

export default function InlineEditComponent({beforeEdit, whiledEditing, mutationFunction}: InlineEditProps) {
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
                <Button icon={<CheckCircleOutlined />} onClick={(e) => {mutateHook.mutate([])}}/>
                <Button icon={<CloseCircleOutlined />} onClick={(e) => {setEditing(false)}}/>
            </Flex>
        } else {
            return <Flex>
                {beforeEdit}
                <Button size="small" icon={<EditOutlined/>} onClick={(e) => {setEditing(true)}}/>
            </Flex>
        }
    }

    return render();

}