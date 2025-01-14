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
    started_at: string,
    finished_at: string | null,
    assertion_results: AssertionResult[] | null
}