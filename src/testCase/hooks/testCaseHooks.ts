import { useMutation, useQuery } from "react-query";
import { QueryResult } from "../../common/hooks/commonHooks";
import axiosInstance from "../../utils/axios";
import queryClient from "../../utils/query";
import { TestCase } from "../types/testCaseTypes";

export const mutateTestCase = async (formData: FormData): Promise<void> => {
    const response = await axiosInstance.post(`/test-cases`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateTestCase = async (test_case_id: String, name: String, description: String): Promise<TestCase> => {
    const response = await axiosInstance.patch(`/test-cases/${test_case_id}`, {
        name: name,
        description: description,
    });
    return response.data;
};

export const updateTestCaseDescription = async (test_case_id: String, description: String): Promise<TestCase> => {
    const response = await axiosInstance.patch(`/test-cases/${test_case_id}/description`, {
        value: description
    });
    return response.data;
};

export const queryTestCases = async (pageKey: string | null, name: string | null): Promise<QueryResult<TestCase>> => {
    const response = await axiosInstance.get(`/test-cases`, {
        params: {
            next_page_key: pageKey ? pageKey : undefined,
            keyword: name ? name : undefined
        }
    });
    return response.data;
};

export const queryTestCase = async (test_case_id: String): Promise<TestCase> => {
    const response = await axiosInstance.get(`/test-cases/${test_case_id}`);
    return response.data;
};

export const useMutateTestCase = (fromProvider: () => FormData) => {
    return useMutation(() => mutateTestCase(fromProvider()));
}

export const useDeleteTestCase = (id: string) => {
    return useMutation(() => deleteTestCase(id), {
        onSuccess() {
            invalidateCaches(id);
        }
    });
}

export interface UpdateTestCasePayload {
    name: string,
    description: string,
}

export const useUpdateTestCase = (id: string) => {
    return useMutation(({ name, description }: UpdateTestCasePayload) => updateTestCase(id, name, description), {
        onSuccess() {
            queryClient.invalidateQueries(["test_case", id]);
            queryClient.invalidateQueries(["test-cases"]);
        },
    });
}

export const useUpdateTestCaseDescription = (id: string, description: string) => {
    return useMutation(() => updateTestCaseDescription(id, description), {
        onSuccess() {
            invalidateCaches(id);
        },
    });
}

export const useTestCaseQuery = (keyword: string | null, pageKey: string | null, onSuccess: (queryResult: QueryResult<TestCase>) => void) => {
    return useQuery(["test-cases", keyword, pageKey], () => queryTestCases(pageKey, keyword), {
        onSuccess(data) {
            onSuccess(data)
        },
    });
}


export const useGetTestCaseQuery = (test_case_id: String) => {
    return useQuery(["test_case", test_case_id], () => queryTestCase(test_case_id));
}

export const deleteTestCase = async (id: string): Promise<void> => {
    return await axiosInstance.delete(`/test-cases/${id}`);
};

function invalidateCaches(id: string) {
    queryClient.invalidateQueries(["test_case", id]);
    queryClient.invalidateQueries(["test-cases"]);
}
