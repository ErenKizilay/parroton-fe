import { Button, Card, Checkbox, Flex, Select } from "antd";
import { useState } from "react";
import { useDeleteAssertion, useUpdateAssertionComparisonType, useUpdateAssertionNegation } from "../hooks/assertionHooks";
import { Assertion, ComparisonType } from "../types/assertionTypes";
import AssertionItemComponent from "./AssertionItemComponent";

export interface AssertionProps {
    test_case_id: string,
    assertion: Assertion,
}

export default function AssertionComponent({ test_case_id, assertion }: AssertionProps) {
    const deleteHook = useDeleteAssertion(test_case_id);
    const [comparionsType, setComparisionType] = useState(assertion.comparison_type);
    const [negate, setNegate] = useState(assertion.negate);
    const mutateComparisionHook = useUpdateAssertionComparisonType(test_case_id, setComparisionType);
    const mutateNegation = useUpdateAssertionNegation(test_case_id, setNegate);
    return <Card key={assertion.id} actions={[
        <Checkbox checked={negate} onChange={(e) => {
            mutateNegation.mutate({ id: assertion.id, negate: e.target.checked })
        }}>Negate</Checkbox>,
        <Select autoFocus style={{ width: "200px" }} onChange={(comparionsType) => {
            mutateComparisionHook.mutate({ id: assertion.id, comparison_type: comparionsType });
        }} value={comparionsType} options={[
            { value: ComparisonType.EqualTo, label: "Equal To" },
            { value: ComparisonType.Contains, label: "Contains" },
            { value: ComparisonType.GreaterThanOrEqualTo, label: "Greater Than or Equal" },
            { value: ComparisonType.GreaterThan, label: "Greater Than" },
            { value: ComparisonType.LessThan, label: "Less Than" },
            { value: ComparisonType.LessThanOrEqualTo, label: "Less Than or Equal" },
        ]} />,
        <Button danger onClick={() => {
            if (assertion) {
                deleteHook.mutate(assertion.id);
            }
        }}>Delete</Button>
    ]}>
        <Flex gap={3} align="center" justify="space-between">
            <AssertionItemComponent customer_id={"eren"} test_case_id={test_case_id} item={assertion.left} asserton_id={assertion.id} left_or_right={"left"} />
            <AssertionItemComponent customer_id={"eren"} test_case_id={test_case_id} item={assertion.right} asserton_id={assertion.id} left_or_right={"right"} />
        </Flex>
    </Card>
}