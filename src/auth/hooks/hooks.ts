import { useMutation, useQuery } from "react-query";
import { QueryResult } from "../../common";
import axiosInstance from "../../utils/axios";
import queryClient from "../../utils/query";
import { AuthProvider, CreteAuthProviderPayload } from "../types/authTypes";

export const deleteAuthProvider = async (id: string): Promise<void> => {
    return await axiosInstance.delete(`/auth-providers/${id}`);
};

export const useDeleteAuthProvider = (id: string) => {
    return useMutation(() => deleteAuthProvider(id), {
        onSuccess() {
            invalidateQueries();
        },
    });
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

export const addAuthHeader = async (auth_provider_id: string, payload: SetAuthHeaderPayload): Promise<AuthProvider> => {
    const response = await axiosInstance.patch(`/auth-providers/${auth_provider_id}/headers`, payload);
    return response.data;
};

export const createAuthProvider = async (payload: CreteAuthProviderPayload): Promise<AuthProvider> => {
    const response = await axiosInstance.post(`/auth-providers`, payload);
    return response.data;
};

export const setAuthHeaderEnablement = async (auth_provider_id: string, payload: SetAuthHeaderEnablementPayload): Promise<AuthProvider> => {
    const response = await axiosInstance.patch(`/auth-providers/${auth_provider_id}/disabled`, payload);
    return response.data;
};

export const useAuthProvidersQuery = (test_case_id: string | null, keyword: string | null, pageKey: string | null, onSuccess: (queryResult: QueryResult<AuthProvider>) => void) => {
    return useQuery(["auth", test_case_id, keyword, pageKey], () => queryAuthProviders(test_case_id, keyword, pageKey), {
        onSuccess(data) {
            onSuccess(data)
        },
    });
}

export const useAuthProvidersQueryWithUrls = (urls: string[]) => {
    return useQuery(["auth-by-urls", urls], () => queryAuthProvidersWithUrls(urls), {
        enabled: urls.length > 0
    })
}

export const useAuthProviderQuery = (id: string) => {
    return useQuery(["auth", id], () => queryAuthProvider(id))
}

export const queryAuthProviders = async (test_case_id: string | null, keyword: string | null, pageKey: string | null): Promise<QueryResult<AuthProvider>> => {
    const response = await axiosInstance.get(`/auth-providers`, {
        params: {
            test_case_id: test_case_id ? test_case_id : undefined,
            keyword: keyword ? keyword : undefined,
            next_page_key: pageKey ? pageKey : undefined,
        }
    });
    return response.data;
};

export const queryAuthProvider = async (id: string): Promise<AuthProvider> => {
    const response = await axiosInstance.get(`/auth-providers/${id}`);
    return response.data;
};

export const queryAuthProvidersWithUrls = async (urls: string[]): Promise<AuthProvider[]> => {
    const response = await axiosInstance.post(`/auth-providers/search-by-urls`, {
        urls
    });
    return response.data;
};

export const useCreateAuthProvider = (onSuccess: (created: AuthProvider) => void) => {
    return useMutation({
        mutationFn: (payload: CreteAuthProviderPayload) => createAuthProvider(payload),
        onSuccess(data) {
            invalidateQueries();
            onSuccess(data);
        },
    })
}

export const useAddAuthHeaderProvider = (auth_provider_id: string) => {
    return useMutation({
        mutationFn: (payload: SetAuthHeaderPayload) => addAuthHeader(auth_provider_id, payload),
        onSuccess() {
            invalidateQueries();
        },
    })
}

function invalidateQueries() {
    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("auth"),
    });
}

