import { useMutation, useQuery } from "react-query";
import axiosInstance from "../../utils/axios";
import { AuthProvider } from "../types/authTypes";
import { QueryResult } from "../../common";

export const deleteAuthProvider = async (id: string): Promise<void> => {
    return await axiosInstance.delete(`/auth-providers/${id}`);
};

export const useDeleteAuthProvider = (id: string) => {
    return useMutation(() => deleteAuthProvider(id));
}

export interface SetAuthHeaderPayload {
    name: string,
    value: string
}
export interface SetAuthHeaderEnablementPayload {
    name: string,
    disabled: boolean
}

export const setAuthHeader = async (auth_provider_id: string, payload: SetAuthHeaderPayload): Promise<AuthProvider> => {
    const response = await axiosInstance.patch(`/auth-providers/${auth_provider_id}/value`, payload);
    return response.data;
};

export const setAuthHeaderEnablement = async (auth_provider_id: string, payload: SetAuthHeaderEnablementPayload): Promise<AuthProvider> => {
    const response = await axiosInstance.patch(`/auth-providers/${auth_provider_id}/disabled`, payload);
    return response.data;
};

export const useAuthProvidersQuery = (customer_id: String, test_case_id: String | null) => {
    return useQuery(["auth", customer_id, test_case_id], () => queryAuthProviders(customer_id, test_case_id), {
        onSuccess(data) {
            data
        },
    });
}

export const queryAuthProviders = async (customer_id: String, test_case_id: String | null): Promise<QueryResult<AuthProvider>> => {
    const response = await axiosInstance.get(`/auth-providers${test_case_id ? `?test_case_id=${test_case_id}` : ''}`);
    return response.data;
};