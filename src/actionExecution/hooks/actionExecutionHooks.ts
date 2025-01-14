import axiosInstance from "../../utils/axios";
import { ActionExecutionPair } from "../types/actionExecutionTypes";


export const queryActionExecutions = async (test_case_id: String, run_id: String): Promise<ActionExecutionPair[]> => {
    const response = await axiosInstance.get(`/test-cases/${test_case_id}/runs/${run_id}/action-executions`);
    return response.data;
};