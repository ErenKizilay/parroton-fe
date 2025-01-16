import { useQuery } from "react-query";
import { Parameter, ParameterIn, ParameterType } from "../types/parameterTypes";
import { QueryResult } from "../../common/hooks/commonHooks";
import axiosInstance from "../../utils/axios";

export const updateParameterExpression = async (test_case_id: string, action_id: string, parameter_id: String, expression: string | undefined): Promise<Parameter> => {
    const response = await axiosInstance.patch(`/test-cases/${test_case_id}/actions/${action_id}/parameters/${parameter_id}/expression`, {
        value: expression === undefined || expression.length === 0 ? null : expression
    });
    return response.data;
};



export const queryParameters = async (query: ParameterQuery): Promise<QueryResult<Parameter>> => {
    const response = await axiosInstance.get(`/test-cases/${query.test_case_id}/actions/${query.action_id}/parameters`, {
        params: {
            path: query.path,
            parameter_in: query.parameter_in,
            parameter_type: query.parameter_type,
        }
    });
    return response.data;
};

export const useParameterQuery = (parameter_query: ParameterQuery) => {
    const key = `${parameter_query.test_case_id}_${parameter_query.action_id}_${parameter_query.parameter_type}_${parameter_query.parameter_in}_${parameter_query.path}`
    return useQuery<QueryResult<Parameter>>(["parameters", key], () => queryParameters(parameter_query), {
        onError: (error) => console.error("Failed to fetch todos:", error)
    });
}

export interface ParameterQuery {
    test_case_id: String,
    action_id: String,
    path?: String,
    parameter_type: ParameterType,
    parameter_in?: ParameterIn,
}