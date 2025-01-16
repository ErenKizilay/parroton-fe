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