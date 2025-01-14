import { useQuery } from "react-query";
import axiosInstance from "../../utils/axios";
import { Action } from "../types/actionTypes";
import { QueryResult } from "../../common";


export const queryActions = async (query: ActionQuery): Promise<QueryResult<Action>> => {
    const response = await axiosInstance.get(`/test-cases/${query.test_case_id}/actions`, {
        params: {
            name: query.name,
            before_order: query.before_order
        }
    });
    return response.data;
};


export const useActionQuery = (action_query: ActionQuery) => {
    return useQuery<QueryResult<Action>>(["actions", action_query.test_case_id], () => queryActions(action_query));
}

export interface ActionQuery {
    test_case_id: String,
    name?: String,
    before_order?: number
}