import { LoadingOutlined } from '@ant-design/icons';
import { Card, Flex, Spin, Typography } from "antd";
import { Run, RunStatus } from "../types/models";
import Duration from './Duration';

const { Text } = Typography;

export interface Props {
    run: Run,
    onClick?: (id: string) => void
}

export default function RunCard({ run, onClick }: Props) {
    return <>
        <Card hoverable={onClick? true : false} onClick={(e) => onClick? onClick(run.id) : ''}>
            <Flex vertical gap={5}>
                <Flex gap={5}>
                    {run.status === RunStatus.InProgress ? <Spin indicator={<LoadingOutlined spin />} /> : ''}
                    <Text>{new Date(run.started_at).toJSON()}</Text>
                </Flex>
                <Duration start={run.started_at} end={run.finished_at} />
            </Flex>
        </Card>
    </>
}