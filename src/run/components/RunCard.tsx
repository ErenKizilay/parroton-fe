import { CheckCircleFilled, CheckCircleTwoTone, CloseCircleFilled, CloseCircleTwoTone, LoadingOutlined } from '@ant-design/icons';
import { Card, Flex, Spin, Typography } from "antd";
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Duration from '../../common/components/Duration';
import { queryRun } from '../hooks/runHooks';
import { Run, RunStatus } from '../types/runTypes';

const { Text } = Typography;

export interface RunCardProps {
    run: Run,
    onClick?: (id: string) => void,
    styles?: React.CSSProperties
}

export default function RunCard({ run, onClick, styles }: RunCardProps) {
    const [newRun, setNewRun] = useState(run);
    const [color, setColor] = useState<string|undefined>();
    useQuery(`${run.test_case_id}_${run.id}_runs`, () => queryRun(run.test_case_id, run.id), {
        enabled: newRun?.status === RunStatus.InProgress,
        refetchInterval: 1000,
        onSuccess(data) {
            setNewRun(data);
        },
    });

    const assertionContent = (): React.ReactNode => {
        if (newRun.assertion_results && newRun.assertion_results.length > 0) {
            const has_failures = newRun.assertion_results.some(a => !a.success);
            return has_failures ? <CloseCircleTwoTone twoToneColor="#eb2f96" /> :
                <CheckCircleTwoTone twoToneColor="#52c41a" />;
        }
        return <></>
    }

    return <>
        <Card style={styles} hoverable={onClick ? true : false} onClick={(e) => onClick ? onClick(run.id) : ''}>
            <Flex vertical gap={5}>
                <Flex gap={3}>
                    {assertionContent()}
                    <Flex gap={5}>
                        {newRun.status === RunStatus.InProgress ? <Spin indicator={<LoadingOutlined spin />} /> : ''}
                        <Text>{new Date(newRun.started_at).toJSON()}</Text>
                    </Flex>
                </Flex>
                <Duration start={newRun.started_at} end={newRun.finished_at} />
            </Flex>
        </Card>
    </>
}