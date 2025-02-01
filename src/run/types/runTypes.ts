import { AssertionResult } from "../../assertion/types/assertionTypes";


export enum RunStatus {
    InProgress = "InProgress",
    Finished = "Finished"
}

export interface Run {
    customer_id: string,
    test_case_id: string,
    id: string,
    status: RunStatus,
    started_at: number,
    finished_at: number | undefined,
    assertion_results: AssertionResult[] | null,
    created_at: number,
    updated_at: number | undefined,
}