import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ActionList from "../components/ActionList";
import AuthProviderComponent from "../components/AuthProvider";
import RunComponent from "../components/RunComponent";
import { queryRuns, useActionQuery, useAuthProvidersQuery, useGetTestCaseQuery, useMutateRun } from "../hooks/hook";
import { Run } from "../types/models";


export default function TestCasePage() {
    const { id } = useParams();
    const { data: auth_providers } = useAuthProvidersQuery("eren", id!)
    const { data: actions } = useActionQuery({ test_case_id: id! });
    const { data: test_case, isLoading, error } = useGetTestCaseQuery(id!);
    const [tabIndex, setTabIndex] = React.useState(0);
    const [run, setRun] = useState<Run>();
    const [runs, setRuns] = useState<Run[]>([]);
    const runMutator = useMutateRun(id!, (data) => { setRun(data) });

    const { } = useQuery<Run[]>(["runs", `${test_case?.id}_${run?.id}`], () => queryRuns(test_case!.id), {
        enabled: test_case !== null && tabIndex === 2,
        onSuccess: (data) => { setRuns(data) }
    });



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const startRun = () => {
        runMutator.mutate();
    }

    const buildTabContent = (): ReactNode => {
        if (test_case) {
            switch (tabIndex) {
                case 0:
                    return <>
                        <Stack width={"%100"}>
                            <Button onClick={startRun}>Run</Button>
                            {actions ? <ActionList actions={actions} /> : ''}
                        </Stack>
                    </>
                case 1:
                    return buildAuthProvidersContent();
                case 2:
                    return <Stack>
                        {runs.map(r => {
                            console.log("r", r);
                            return <RunComponent key={r.id} runId={r.id} testCaseId={test_case.id} actions={actions ? actions : []} />
                        })}
                    </Stack>;
                default: <></>
            }
        }
        return <>
        </>
    }

    const buildAuthProvidersContent = (): ReactNode => {
        return <>
            <Stack>
                {auth_providers?.map(a => {
                    return <AuthProviderComponent provider={a}></AuthProviderComponent>
                })}
            </Stack>
        </>
    }

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Stack>
                <Typography variant="h5">{test_case?.name}</Typography>
                <Typography variant="body1">{test_case?.description}</Typography>
            </Stack>
            <Tabs value={tabIndex} onChange={handleChange} centered>
                <Tab label="Actions" />
                <Tab label="Auth Providers" />
                <Tab label="Runs" />
            </Tabs>
            <Stack>
                {buildTabContent()}
            </Stack>
        </Box>
    );
}