import { Stack } from "@mui/material";
import TestCaseCard from "../components/TestCaseCard";
import { useTestCaseQuery } from "../hooks/hook";


export default function TestCasesPage() {
    const { data: test_cases, isLoading, error } = useTestCaseQuery("eren");
    return <>
        <Stack
            spacing={1}
            margin={1}
            useFlexGap={true}
            justifyContent={"center"}
            alignItems={'stretch'}
            alignContent={'flex-start'}
            direction={'row'}
            flexWrap={'wrap'}>
            {test_cases?.map(t => <TestCaseCard key={t.id} test_case={t}></TestCaseCard>)}
        </Stack>
    </>
}