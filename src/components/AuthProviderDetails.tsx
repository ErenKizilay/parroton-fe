import { Checkbox, Flex, Table, TableProps, Typography } from "antd";
import { AuthHeaderValue, AuthProvider } from "../types/models";
import CodeComponent from "./CodeComponent";


export interface Props {
    authProvider: AuthProvider
}

interface AuthHeader {
    name: string,
    value: string,
    disabled: boolean
}

export default function AuthProviderDetails({ authProvider }: Props) {
    console.log(authProvider)
    const columns: TableProps<AuthHeader>['columns'] = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: 'value',
            dataIndex: 'value',
            key: 'value',
            render: (text) => <CodeComponent data={text} />,
        },
        {
            title: 'disabled',
            dataIndex: 'disabled',
            key: 'disabled',
            render: (text) => <Checkbox defaultChecked={text} />,
        }
    ];
    const headers: AuthHeader[] = []
    Object.entries(authProvider.headers_by_name).forEach(([k, v]) => {
        headers.push({
            name: k,
            disabled: v.disabled,
            value: v.value
        })
    })

    return <Flex vertical>
        <Typography.Text code>{authProvider.base_url}</Typography.Text>
        <Table columns={columns} dataSource={headers}></Table>
    </Flex>

}