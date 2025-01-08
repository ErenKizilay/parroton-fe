import { Card, Flex, Typography } from "antd";
import { AuthProvider } from "../types/models";

export interface Props {
    authProvider: AuthProvider,
    onClick: (id: string) => void
}
export default function AuthProviderCard({ authProvider, onClick }: Props) {
    return <Card hoverable onClick={(e) => onClick(authProvider.id)}>
        <Flex vertical>
            <Typography.Text>{authProvider.base_url}</Typography.Text>
            <Typography.Text>used in {authProvider.linked_test_case_ids.length} test cases</Typography.Text>
        </Flex>
    </Card>
}