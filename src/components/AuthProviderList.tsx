import { Col, Divider, Flex, Row } from "antd";
import { useState } from "react";
import { useAuthProvidersQuery } from "../hooks/hook";
import AuthProviderCard from "./AuthProviderCard";
import AuthProviderDetails from "./AuthProviderDetails";
import DataLoaderComponent from "./DataLoaderComponent";

export interface Props {
    customerId: string,
    testCaseId: string | null
}

export default function AuthProviderList({ customerId, testCaseId }: Props) {
    const { data, isLoading, error } = useAuthProvidersQuery(customerId, testCaseId);
    const [selected, setSelected] = useState<string>('');

    const renderCards = (): React.ReactNode => {
        return <Flex vertical>
            {data?.items.map(i => <AuthProviderCard onClick={(id) => setSelected(id)} authProvider={i} />)}
        </Flex>
    }

    const renderSelected = (): React.ReactNode => {
        return data?.items
            .filter(i => i.id === selected)
            .map(i => <AuthProviderDetails authProvider={i} />)
    }

    return <>
        <Row>
            <Col span={6}>
                <DataLoaderComponent isLoading={isLoading} error={error} render={renderCards} />
            </Col>
            <Col span={18}>
                {renderSelected()}
            </Col>
        </Row>
    </>
}