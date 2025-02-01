import { useQuery, UseQueryOptions } from "react-query";
import axiosInstance from "../../utils/axios";

export interface QueryResult<T> {
    items: T[],
    next_page_key: string | null
}

export const queryAutoComplete = async (query: AutoCompleteQuery): Promise<string[]> => {
    const response = await axiosInstance.post("/auto-complete", query);
    return response.data;
};

export const useAutoCompleteQuery = (query: AutoCompleteQuery) => {
    const key = `${query.test_case_id}_${query.test_case_id}_${query.latest_input}`
    return useQuery<string[]>(["auto-complete", key], () => queryAutoComplete(query), {
        enabled: query.latest_input.length > 0
    });
}

export interface AutoCompleteQuery {
    customer_id: string,
    test_case_id: string,
    source_action_order: number | null,
    latest_input: string,
}