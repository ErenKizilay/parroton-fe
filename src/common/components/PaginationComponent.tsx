import React, { useState } from "react";
import { PageKeyType } from "../types/commonTypes";
import { Button, Card, Flex } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';



export interface PaginationComponentProps {
    pageKeys: PageKeyType[]
    currentPageIndex: number;
    dataLoader: React.ReactNode,
    setCurrentPageIndex: React.Dispatch<React.SetStateAction<number>>,
    hasNextPage: boolean
}

export default function PaginationComponent({hasNextPage, currentPageIndex, setCurrentPageIndex, pageKeys, dataLoader}:PaginationComponentProps) {
    
    const onPrev = (): void => {
        if(currentPageIndex > 0) {
            setCurrentPageIndex((prev) => {
                return prev - 1;
            })
        }
    }

    const onNext = (): void => {
        if(currentPageIndex < pageKeys.length - 1) {
            setCurrentPageIndex((prev) => {
                return prev + 1;
            });
        }
    }

    return <Flex vertical>
        <Card>
            {dataLoader}
        </Card>
        <Flex gap={2} align="center" justify="center">
            <Button icon={<LeftOutlined/>} iconPosition="start" disabled={currentPageIndex <= 0} onClick={(e) => onPrev()}>Prev</Button>
            <Button icon={<RightOutlined />} iconPosition="end" disabled={!hasNextPage} onClick={(e) => onNext()}>Next</Button>
        </Flex>
    </Flex>
}