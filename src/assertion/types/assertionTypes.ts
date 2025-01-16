import { Expression } from "../../common";

export enum Operation {
    Sum = "Sum",
    Avg = "Avg",
    Count = "Count",
}

export enum ComparisonType {
    EqualTo = "EqualTo",
    Contains = "Contains",
    GreaterThan = "GreaterThan",
    GreaterThanOrEqualTo = "GreaterThanOrEqualTo",
    LessThan = "LessThan",
    LessThanOrEqualTo = "LessThanOrEqualTo",
}

export interface ValueProvider {
    expression: Expression | null,
    value: any | null,
}

export interface Function {
    operation: Operation,
    parameters: ValueProvider[],
}

export interface AssertionItem {
    function: Function | null,
    value_provider: ValueProvider | null,
}

export interface Assertion {
    customer_id: string,
    test_case_id: string,
    id: string,
    left: AssertionItem,
    right: AssertionItem,
    comparison_type: ComparisonType,
    negate: boolean,
}

export interface AssertionResult {
    assertion_id: string,
    success: boolean,
    message: string | null,
}
