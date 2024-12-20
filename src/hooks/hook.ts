import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { Action, ActionExecution, AuthProvider, Parameter, ParameterIn, ParameterType, Run, TestCase } from "../types/models";
import axiosInstance from "../utils/axios";

export const queryTestCases = async (customer_id: String): Promise<TestCase[]> => {
    const response = await axiosInstance.get("/test-cases");
    return response.data;
};

export const queryAuthProviders = async (customer_id: String, test_case_id: String | null): Promise<AuthProvider[]> => {
    const response = await axiosInstance.get(`/auth-providers${test_case_id ? `?test_case_id=${test_case_id}` : ''}`);
    return response.data;
};

export const queryTestCase = async (test_case_id: String): Promise<TestCase> => {
    const response = await axiosInstance.get(`/test-cases/${test_case_id}`);
    return response.data;
};

export const queryRun = async (test_case_id: String, run_id: String): Promise<Run> => {
    const response = await axiosInstance.get(`/test-cases/${test_case_id}/runs/${run_id}`);
    return response.data;
};

export const queryRuns = async (test_case_id: String): Promise<Run[]> => {
    const response = await axiosInstance.get(`/test-cases/${test_case_id}/runs`);
    return response.data;
};

export const queryActionExecutions = async (test_case_id: String, run_id: String): Promise<ActionExecution[]> => {
    console.log("exec before in: {}, {}", test_case_id, run_id)
    const response = await axiosInstance.get(`/test-cases/${test_case_id}/runs/${run_id}/action-executions`);
    console.log("exec inner: {}", response.data)
    return response.data;
};

export const queryAutoComplete = async (query: AutoCompleteQuery): Promise<string[]> => {
    const response = await axiosInstance.post("/auto-complete", query);
    return response.data;
};

export const mutateRun = async (test_case_id: String): Promise<Run> => {
    const response = await axiosInstance.post(`/test-cases/${test_case_id}/run`);
    return response.data;
};

export const mutateTestCase = async (formData: FormData): Promise<void> => {
    const response = await axiosInstance.post(`/test-cases`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const queryActions = async (query: ActionQuery): Promise<Action[]> => {
    const response = await axiosInstance.get(`/test-cases/${query.test_case_id}/actions`, {
        params: {
            name: query.name,
            before_order: query.before_order
        }
    });
    return response.data;
};

export const queryParameters = async (query: ParameterQuery): Promise<Parameter[]> => {
    const response = await axiosInstance.get(`/test-cases/${query.test_case_id}/actions/${query.action_id}/parameters`, {
        params: {
            path: query.path,
            parameter_in: query.parameter_in,
            parameter_type: query.parameter_type,
        }
    });
    return response.data;
};

export const useTestCaseQuery = (customer_id: String) => {
    return useQuery(["customer", customer_id], () => queryTestCases(customer_id));
}

export const useActionExectionsQuery = (test_case_id: String, run_id: String, options?: Omit<UseQueryOptions<ActionExecution[]>, any>) => {
    return useQuery(["run_id_status", run_id + status], () => queryActionExecutions(test_case_id, run_id), options);
}

export const useMutateRun = (test_case_id: String, setFunction: (run: Run) => void) => {
    return useMutation(() => mutateRun(test_case_id), {
        onSuccess: (data) => { setFunction(data) }
    });
}

export const useMutateTestCase = (fromProvider: () => FormData) => {
    return useMutation(() => mutateTestCase(fromProvider()));
}

export const useRunQuery = (test_case_id: String, run_id: String, options?: Omit<UseQueryOptions<Run>, any>) => {
    const { data, isLoading, error } = useQuery(["run_id", `${test_case_id}_${run_id}`], () => queryRun(test_case_id, run_id), options);
    console.log("run: {}", data)
    return { data, isLoading, error };
}

export const useAuthProvidersQuery = (customer_id: String, test_case_id: String | null) => {
    return useQuery(["customer", customer_id], () => queryAuthProviders(customer_id, test_case_id), {
        onSuccess(data) {
            data
        },
    });
}

export const useGetTestCaseQuery = (test_case_id: String) => {
    return useQuery(["test_case", test_case_id], () => queryTestCase(test_case_id));
}

export const useRunsQuery = (test_case_id: String) => {
    return useQuery(["runs", test_case_id], () => queryRuns(test_case_id));
}

export const useActionQuery = (action_query: ActionQuery) => {
    return useQuery<Action[]>(["actions", action_query.test_case_id], () => queryActions(action_query));
}

export const useParameterQuery = (parameter_query: ParameterQuery) => {
    const key = `${parameter_query.test_case_id}_${parameter_query.action_id}_${parameter_query.parameter_type}_${parameter_query.parameter_in}_${parameter_query.path}`
    return useQuery<Parameter[]>(["parameters", key], () => queryParameters(parameter_query), {
        onError: (error) => console.error("Failed to fetch todos:", error),
        placeholderData: [],
        initialData: []
    });
}

export const useAutoCompleteQuery = (query: AutoCompleteQuery, options?: Omit<UseQueryOptions<string[]>, any>) => {
    const key = `${query.test_case_id}_${query.test_case_id}_${query.source_action_id}_${query.latest_input}`
    return useQuery<string[]>(["auto-complete", key], () => queryAutoComplete(query), options);
}

export interface ActionQuery {
    test_case_id: String,
    name?: String,
    before_order?: number
}

export interface ParameterQuery {
    test_case_id: String,
    action_id: String,
    path?: String,
    parameter_type: ParameterType,
    parameter_in?: ParameterIn,
}

export interface AutoCompleteQuery {
    customer_id: string,
    test_case_id: string,
    source_action_id: string,
    source_action_name: string,
    source_action_order: number,
    latest_input: string,
}