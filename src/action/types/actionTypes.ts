
export interface Action {
    customer_id: string,
    test_case_id: string,
    id: string,
    order: number,
    url: string,
    name: string,
    mime_type: string,
    method: string,
    created_at: number,
    updated_at: number | undefined,
}