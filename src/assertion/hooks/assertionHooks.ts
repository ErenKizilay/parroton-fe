import { useMutation, useQuery } from "react-query";
import axiosInstance from "../../utils/axios";
import { Assertion, ComparisonType } from "../types/assertionTypes";
import { QueryResult } from "../../common";
import queryClient from "../../utils/query";

export const queryAssertions = async (test_case_id: String): Promise<QueryResult<Assertion>> => {
    const response = await axiosInstance.get(`/test-cases/${test_case_id}/assertions`);
    return response.data;
};

export const batchGetAssertions = async (test_case_id: string, ids: string[]): Promise<Assertion[]> => {
    const response = await axiosInstance.post(`/test-cases/${test_case_id}/assertions/batch-get`, ids);
    return response.data;
};

export const queryAssertion = async (test_case_id: String, id: String): Promise<Assertion> => {
    const response = await axiosInstance.get(`/test-cases/${test_case_id}/assertions/${id}`);
    return response.data;
};

export const deleteAssertion = async (test_case_id: string, id: string): Promise<Assertion|null> => {
    return await axiosInstance.delete(`/test-cases/${test_case_id}/assertions/${id}`);
};

export const useAssertionsQuery = (test_case_id: String) => {
    return useQuery(["assertions", test_case_id], () => queryAssertions(test_case_id));
}

export const useAssertionQuery = (test_case_id: String, id: String) => {
    return useQuery(["assertions", test_case_id, id], () => queryAssertion(test_case_id, id));
}

export const useBatchAssertionsQuery = (test_case_id: string, ids: string[]) => {
    return useQuery(["assertions-batch-get", test_case_id], () => batchGetAssertions(test_case_id, ids), {
        enabled: ids.length > 0
    });
}

export const useDeleteAssertion = (test_case_id: string) => {
    return useMutation((id:string) => deleteAssertion(test_case_id, id), {
        onSuccess(data) {
            evictCaches(test_case_id, data);
        },
    });
}

export const updateAssertionComparisionType = async (test_case_id: String, id: string, comparison_type: ComparisonType): Promise<Assertion> => {
    const response = await axiosInstance.patch(`/test-cases/${test_case_id}/assertions/${id}/comparison-type`, {
        value: comparison_type
    });
    return response.data;
};

export interface UpdateComparisonType {
    id: string,
    comparison_type: ComparisonType
}

export interface UpdateAssertionNegation {
    id: string,
    negate: boolean
}

export interface UpdateAssertionExpression {
    id: string,
    expression: string | undefined,
    leftOrRight: "left" | "right"
}

export const useUpdateAssertionComparisonType = (test_case_id: string, setComparisionType: React.Dispatch<React.SetStateAction<ComparisonType>>) => {
    return useMutation((update: UpdateComparisonType) => updateAssertionComparisionType(test_case_id, update.id, update.comparison_type), {
        onSuccess(data) {
            evictCaches(test_case_id, data);
            setComparisionType(data.comparison_type);
        },
    });
}

export const useUpdateAssertionNegation = (test_case_id: string, setNegation: React.Dispatch<React.SetStateAction<boolean>>) => {
    return useMutation((update: UpdateAssertionNegation) => updateAssertionNegation(test_case_id, update.id, update.negate), {
        onSuccess(data) {
            evictCaches(test_case_id, data);
            setNegation(data.negate);
        },
    });
}

export const useUpdateAssertionExpression = (test_case_id: string) => {
    return useMutation((update: UpdateAssertionExpression) => updateAssertionExpression(test_case_id, update.id, update.leftOrRight, update.expression), {
        onSuccess(data) {
            evictCaches(test_case_id, data);
        },
    });
}

export const updateAssertionNegation = async (test_case_id: String, id: string, negate: boolean): Promise<Assertion> => {
    const response = await axiosInstance.patch(`/test-cases/${test_case_id}/assertions/${id}/negate`, {
        value: negate
    });
    return response.data;
};

export const updateAssertionExpression = async (test_case_id: String, id: string, leftOrRight: "left" | "right", expression: string | undefined): Promise<Assertion> => {
    const response = await axiosInstance.patch(`/test-cases/${test_case_id}/assertions/${id}/${leftOrRight}/expression`, {
        value: expression
    });
    return response.data;
};

function evictCaches(test_case_id: string, data: Assertion | null) {
    queryClient.invalidateQueries(["assertions", test_case_id]);
    queryClient.invalidateQueries(["assertions-batch-get", test_case_id]);
    queryClient.invalidateQueries(["assertions", test_case_id, data?.id]);
}
