export interface AuthProvider {
    customer_id: string,
    test_case_id: string,
    base_url: string,
    name: string,
    id: string,
    headers_by_name: Map<string, AuthHeaderValue>,
    linked_test_case_ids: string[],
    created_at: number,
    updated_at: number | undefined,

}

export interface AuthHeaderValue {
    value: string,
    disabled: boolean
}

interface BasicAuthHeader {
    name: string,
    value: string
}


export interface CreteAuthProviderPayload {
    name: string,
    url: string,
    headers: BasicAuthHeader[]
}