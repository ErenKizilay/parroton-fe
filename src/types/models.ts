export interface TestCase {
     customer_id: string,
     id: string,
     name: string,
     description: string | null,
}

export enum ParameterType {
    Input = "Input",
    Output = "Output",
}



export interface ParameterLocation {
    Header?: string,
    Cookie?: string,
    Body?: string,
    Query?: string,
}

 export enum ParameterIn {
    Header = "Header",
    Cookie = "Cookie",
    Query = "Query",
    Body = "Body",
    StatusCode = "StatusCode"
}


export interface Parameter {
     customer_id: string,
     test_case_id: string,
     action_id: string,
     id: string,
     parameter_type: ParameterType,
     location: ParameterLocation,
     value: Object,
     value_expression?: Expression,

}

export interface AuthProvider {
    customer_id: string,
    test_case_id: string,
    base_url: string,
    id: string,
    headers_by_name: Map<string, AuthHeaderValue>,
    linked_test_case_ids: string[]

}

export interface AuthHeaderValue {
    value: string,
    disabled: boolean
}

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
    finished_at: string | null
}

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


export interface Action {
     customer_id: string,
     test_case_id: string,
     id: string,
     order: number,
     url: string,
     name: string,
     mime_type: string,
     method: string,
}


export interface Expression {
     value: string,
}

export function get_path(location: ParameterLocation): string {
    if(location.Body) {
        return location.Body
    }
    if(location.Header) {
        return location.Header
    }
    if(location.Query) {
        return location.Query
    }
    if(location.Cookie) {
        return location.Cookie
    }
    return "";
} 
