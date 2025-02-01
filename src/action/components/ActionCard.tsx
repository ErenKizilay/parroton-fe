import { Flex, Tag, Typography } from "antd";
import { ReactNode } from "react";
import { Action } from "../types/actionTypes";

const { Text } = Typography;

export interface ActionCardProps {
    action: Action
}

export default function ActionCard({ action }: ActionCardProps) {

    const buildMethod = (): ReactNode => {
        let color = "";
        switch (action.method) {
            case "GET":
                color = "green";
                break;
            case "POST":
                color = "yellow";
                break;
            case "PUT":
                color = "gray";
                break;
            case "PATCH":
                color = "black";
                break;
            case "DELETE":
                color = "red";
                break;

        }
        return <Tag color={color}>
            {action.method}
        </Tag>
    }

    return <>
        <Flex gap={5}>
            {buildMethod()}
            <Text strong>{action.name}</Text>
        </Flex>
    </>
}