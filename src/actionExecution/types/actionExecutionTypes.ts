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
    query_params: [][],
    started_at: string,
    finished_at: string,
}

export interface ActionExecutionPair {
    action: Action | null,
    execution: ActionExecution
}