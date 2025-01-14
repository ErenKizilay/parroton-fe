import { Collapse, Empty, Typography } from "antd";
import { useQueryClient } from "react-query";
import { useAuthProvidersQuery } from "../hooks/hooks";
import AuthProviderDetails from "./AuthProviderDetails";

export interface AuthListProps {
    customerId: string,
    testCaseId: string | null
}

export default function AuthProviderList({ customerId, testCaseId }: AuthListProps) {
    const { data, isLoading, error } = useAuthProvidersQuery(customerId, testCaseId);
    const queryClient = useQueryClient();

    const listContent = (): React.ReactNode => {
        if(data && data.items.length === 0) {
            return <Empty description={"No auth provider defined"}/>
        }
        const items = data?.items.map(i => {
            return {
                key: i.id,
                label: <Typography.Text strong>{i.base_url}</Typography.Text>,
                children: <AuthProviderDetails key={i.id} deleted={(id) => {
                    queryClient.invalidateQueries(["auth", customerId, testCaseId]);
                }} authProvider={i} />
            }
        });
        return <Collapse items={items} />
    }

    return <>
        {listContent()}
    </>
}