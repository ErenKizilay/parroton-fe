import { Expression } from "../../common";


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

export function get_path(location: ParameterLocation): string {
    if (location.Body) {
        return location.Body
    }
    if (location.Header) {
        return location.Header
    }
    if (location.Query) {
        return location.Query
    }
    if (location.Cookie) {
        return location.Cookie
    }
    return "";
} 