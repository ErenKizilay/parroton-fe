import { Collapse, Empty, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { PageKeyType } from "../../common";
import DataLoaderComponent from "../../common/components/DataLoaderComponent";
import PaginationComponent from "../../common/components/PaginationComponent";
import { useAuthProvidersQuery } from "../hooks/hooks";
import AuthProviderDetails from "./AuthProviderDetails";
import CreateAuthProvider from "./CreateAuthProvider";

export interface AuthListProps {
    testCaseId: string | null
}

export default function AuthProviderList({ testCaseId }: AuthListProps) {
    const [keyword, setKeyword] = useState<string | null>(null);
    const [pageKeys, setPageKeys] = useState<PageKeyType[]>(Array.of(null))
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const { data, isLoading, error } = useAuthProvidersQuery(testCaseId, keyword, pageKeys[currentPageIndex], (qr) => {
        if (currentPageIndex + 1 === pageKeys.length) {
            setPageKeys((prev) => {
                const newKeys = [...prev];
                newKeys.push(qr.next_page_key)
                return newKeys;
            })
        }
    });

    const listContent = (): React.ReactNode => {
        if (data && data.items.length === 0) {
            return <Empty description={"No auth provider defined"} />
        }
        const items = data?.items.map(i => {
            return {
                key: i.id,
                label: <Typography.Text strong>{i.name}</Typography.Text>,
                children: <AuthProviderDetails key={i.id} authProvider={i} />
            }
        });
        return <Collapse size="large" items={items} />
    }

    const handleKeywordChange = (value:string): void => {
        setKeyword(value);
        setCurrentPageIndex(0);
        setPageKeys(Array.of(null));
    }

    return <Flex vertical gap={3}>
        <Flex gap={5}>
            <Search onChange={(e) => {
                handleKeywordChange(e.target.value);
            }} placeholder="search provider by name" allowClear />
            <CreateAuthProvider />
        </Flex>
        <PaginationComponent
            pageKeys={pageKeys}
            currentPageIndex={currentPageIndex}
            dataLoader={<DataLoaderComponent isLoading={isLoading} error={error} render={listContent} />}
            setCurrentPageIndex={setCurrentPageIndex} hasNextPage={data?.next_page_key !== null} />
    </Flex>
}