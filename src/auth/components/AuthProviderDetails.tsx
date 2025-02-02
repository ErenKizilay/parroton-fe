import {
    DeleteTwoTone
} from '@ant-design/icons';
import { Button, Card, Checkbox, Divider, Flex, Input, message, Popconfirm, Typography } from "antd";
import React, { useState } from "react";
import { AuthProvider } from "..";
import CodeComponent2 from "../../common/components/CodeComponent2";
import InlineEditComponent from "../../common/components/InlineEditComponent";
import { setAuthHeader, setAuthHeaderEnablement, useDeleteAuthProvider } from "../hooks/hooks";
import AddAuthHeader from './AddAuthHeader';


export interface Props {
    authProvider: AuthProvider,
}

interface AuthHeader {
    name: string,
    value: string,
    disabled: boolean,
    index: number
}

export default function AuthProviderDetails({ authProvider }: Props) {
    const deleteHook = useDeleteAuthProvider(authProvider.id);
    const [value, setValue] = useState("");
    const [headers, setHeaders] = useState<AuthHeader[]>(() =>
        Object.entries(authProvider.headers_by_name).sort((i1, i2) => i1[0].localeCompare(i2[0])).map(([k, v], i) => ({
            name: k,
            disabled: v.disabled,
            value: v.value,
            index: i,
        }))
    );

    const handleUpdate = (index: number, key: keyof AuthHeader, value: any) => {
        if (key === "value") {
            setAuthHeader(authProvider.id, {
                name: headers[index].name,
                value: value
            }).catch((err) => { message.error(new String(err)) })
                .then(() => message.success("update completed"));
        }
        if (key === "disabled") {
            setAuthHeaderEnablement(authProvider.id, {
                name: headers[index].name,
                disabled: value
            }).catch((err) => { message.error(new String(err)) })
                .then(() => message.success("update completed"));
        }
        setHeaders((prevHeaders) =>
            prevHeaders.map((header) =>
                header.index === index ? { ...header, [key]: value } : header
            )
        );
    };

    const handleDelete = () => {
        deleteHook.mutate();
    }

    const headersContent = (): React.ReactNode => {
        return <Flex vertical>
            {headers.map((h, i) => <Card>
                <Flex justify="space-between">
                    <Typography.Text strong>{h.name}</Typography.Text>
                    <Checkbox checked={h.disabled} onChange={(e) => handleUpdate(i, "disabled", e.target.checked)}>
                        Disable
                    </Checkbox>
                </Flex>
                <Divider />
                <InlineEditComponent beforeEdit={<CodeComponent2 data={h.value} copyable={false} />}
                whiledEditing={<Input.TextArea defaultValue={h.value} onChange={(e) => setValue(e.target.value)}></Input.TextArea>}
                mutationFunction={() => {
                    handleUpdate(i, "value", value);
                    return Promise.resolve();
                } } onCancel={() => {
                    setValue(h.value);
                }} />
            </Card>)}
        </Flex>
    }

    return <Flex vertical>
        <Card title={<Typography.Text code copyable>{authProvider.base_url}</Typography.Text>} extra={
            [<AddAuthHeader auth_provider_id={authProvider.id} />,
            <Popconfirm title={"Delete Auth Provider"} description={"Are you sure to delete?"} onConfirm={() => handleDelete()} okText="Yes"
                cancelText="No">
                <Button icon={<DeleteTwoTone twoToneColor='#eb2f96' />}></Button>
            </Popconfirm>]

        }>
            <Flex vertical>
                {headersContent()}
            </Flex>
        </Card>
    </Flex>

}