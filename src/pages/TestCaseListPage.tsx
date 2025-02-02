import { Button, Empty, Flex, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataLoaderComponent from "../common/components/DataLoaderComponent";
import TestCaseCard from "../testCase/components/TestCaseCard";
import { useTestCaseQuery } from "../testCase/hooks/testCaseHooks";
import { PageKeyType } from "../common";
import PaginationComponent from "../common/components/PaginationComponent";
import Search from "antd/es/input/Search";

export default function TestCaseListPage() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<string | null>(null);
        const [pageKeys, setPageKeys] = useState<PageKeyType[]>(Array.of(null))
        const [currentPageIndex, setCurrentPageIndex] = useState(0);
        const { data, isLoading, error } = useTestCaseQuery(keyword, pageKeys[currentPageIndex], (qr) => {
            if (currentPageIndex + 1 === pageKeys.length) {
                setPageKeys((prev) => {
                    const newKeys = [...prev];
                    newKeys.push(qr.next_page_key)
                    return newKeys;
                })
            }
        });


    const empty = (): React.ReactNode => {
        return <Empty
            description={
                <Typography.Text>
                    There is no TestCase yet.
                </Typography.Text>
            }
        >
            <Button onClick={() => { navigate("/upload") }} type="primary">Create Now</Button>
        </Empty>
    }

    const render = (): React.ReactNode => {
        if (data?.items.length === 0) {
            return empty();
        } else {
            return <Flex justify="center" align="center" gap={2}>
                {
                    data?.items.map(i => {
                        return <TestCaseCard key={i.id} testCase={i} onClick={(tc) => { navigate(`/test-cases/${tc.id}`) }} />
                    })
                }
            </Flex>
        }
    }

    return <Flex vertical gap={3}>
        <Flex gap={5}>
            <Search onChange={(e) => setKeyword(e.target.value)} placeholder="search cases by name" allowClear />
            <Button type="primary" onClick={() => navigate(`/upload`)}>Create new</Button>
        </Flex>
        <PaginationComponent pageKeys={pageKeys} 
        currentPageIndex={currentPageIndex} 
        dataLoader={<DataLoaderComponent 
            isLoading={isLoading} 
            error={error} 
            render={render}></DataLoaderComponent>} 
            setCurrentPageIndex={setCurrentPageIndex} 
            hasNextPage={data?.next_page_key !== null}/>
    </Flex>
}