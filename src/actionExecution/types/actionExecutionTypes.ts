import { Action } from "../../action/types/actionTypes";


export interface ActionExecution {
    run_id: string,
    customer_id: string,
    test_case_id: string,
    action_id: string,
    id: string,
    status_code: number,
    error: string | null,
    request_body: any | null,
    response_body: any | null,
    query_params: string[][],
    started_at: number,
    finished_at: number,
    created_at: number,
    updated_at: number | undefined,
}

export interface ActionExecutionPair {
    action: Action | null,
    execution: ActionExecution
}