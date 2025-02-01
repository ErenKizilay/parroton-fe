import { CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined } from '@ant-design/icons';
import { Card, Flex, Progress, Spin, Typography } from "antd";
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
    const [color, setColor] = useState<string | undefined>();
    useQuery(`${run.test_case_id}_${run.id}_runs`, () => queryRun(run.test_case_id, run.id), {
        enabled: newRun?.status === RunStatus.InProgress,
        refetchInterval: 1000,
        onSuccess(data) {
            setNewRun(data);
        },
    });
    const failure_count = newRun?.assertion_results?.filter(a => !a.success).length;
    const total_count = newRun?.assertion_results?.length;

    const assertionContent = (): React.ReactNode => {
        if (newRun.assertion_results && newRun.assertion_results.length > 0) {
            return failure_count && failure_count > 0 ? <CloseCircleTwoTone twoToneColor="#eb2f96" /> :
                <CheckCircleTwoTone twoToneColor="#52c41a" />;
        }
        return <></>
    }

    const success_percent = (total_count && failure_count ? (total_count- failure_count) / total_count : 1) * 100
    const fail_percent = (total_count && failure_count ? (failure_count) / total_count : 1) * 100

    return <>
        <Card style={styles} hoverable={onClick ? true : false} onClick={(e) => onClick ? onClick(run.id) : ''}>
            <Flex gap={10}>
                <Flex vertical gap={5}>
                    <Flex gap={3}>
                        <Flex gap={5}>
                            {newRun.status === RunStatus.InProgress ? <Spin indicator={<LoadingOutlined spin />} /> : ''}
                            <Text>{new Date(newRun.started_at).toJSON()}</Text>
                        </Flex>
                    </Flex>
                    <Duration start={newRun.started_at} end={newRun.finished_at} />
                </Flex>
                {newRun.assertion_results ? <Progress 
                    size="small" 
                    type="circle" 
                    percent={100}  status={failure_count && failure_count > 0 ? "exception": "success"} 
                    success={{percent: success_percent}}
                    format={failure_count == 0 ? undefined : (percent) => `%${fail_percent.toFixed(1)}`} /> : ''}
            </Flex>

        </Card>
    </>
}