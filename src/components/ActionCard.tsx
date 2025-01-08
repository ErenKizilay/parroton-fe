import { Card, Flex, Tag, Typography } from "antd";
import { ReactNode } from "react";
import { Action } from "../types/models";

const { Text } = Typography;

export interface Props {
    action: Action
}

export default function ActionCard({ action }: Props) {

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
        <Card>
            <Flex gap={5}>
                {buildMethod()}
                <Text strong>{action.name}</Text>
                <Text underline>{action.url}</Text>
            </Flex>
        </Card>
    </>
}