import { useMutation, useQuery, UseQueryOptions } from "react-query";
import axiosInstance from "../../utils/axios";
import { Run } from "../types/runTypes";
import { QueryResult } from "../../common/hooks/commonHooks";

export const queryRun = async (test_case_id: String, run_id: String): Promise<Run> => {
    const response = await axiosInstance.get(`/test-cases/${test_case_id}/runs/${run_id}`);
    return response.data;
};

export const queryRuns = async (test_case_id: String): Promise<QueryResult<Run>> => {
    const response = await axiosInstance.get(`/test-cases/${test_case_id}/runs`);
    return response.data;
};

export const mutateRun = async (test_case_id: String): Promise<Run> => {
    const response = await axiosInstance.post(`/test-cases/${test_case_id}/run`);
    return response.data;
};

export const useMutateRun = (test_case_id: String, setFunction: (run: Run) => void) => {
    return useMutation(() => mutateRun(test_case_id), {
        onSuccess: (data) => { setFunction(data) }
    });
}

export const useRunQuery = (test_case_id: String, run_id: String, options?: Omit<UseQueryOptions<Run>, any>) => {
    const { data, isLoading, error } = useQuery(["run_id", `${test_case_id}_${run_id}`], () => queryRun(test_case_id, run_id), options);
    console.log("run: {}", data)
    return { data, isLoading, error };
}

export const useRunsQuery = (test_case_id: String) => {
    return useQuery(["runs", test_case_id], () => queryRuns(test_case_id));
}