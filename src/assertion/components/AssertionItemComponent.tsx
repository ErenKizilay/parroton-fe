import { Flex, Radio, Select } from "antd"
import React, { useState } from "react"
import CodeComponent2 from "../../common/components/CodeComponent2"
import ExpressionComponent from "../../common/components/ExpressionComponent"
import { AssertionItem, Operation, ValueProvider } from "../types/assertionTypes"
import { useUpdateAssertionExpression } from "../hooks/assertionHooks"

export interface AssertionItemProps {
    customer_id: string,
    test_case_id: string,
    asserton_id: string,
    left_or_right: "left"|"right",
    item: AssertionItem,
    
}

export default function AssertionItemComponent({ customer_id, test_case_id, item, left_or_right, asserton_id }: AssertionItemProps) {
    const [tab, setTab] = useState(item.function ? "func": "exp");
    const updateExpressionHook = useUpdateAssertionExpression(test_case_id);

    const renderFunction = (): React.ReactNode => {
        if (item.function) {
            return <Flex gap={2} align="center">
                <Select value={Operation.Sum} style={{ width: "100%" }} options={[
                    { value: Operation.Sum, label: "Sum" },
                    { value: Operation.Avg, label: "Avarage" },
                    { value: Operation.Count, label: "Count" },
                ]} />
                <Flex vertical>
                    {item.function.parameters.map(vp => renderValProvider(vp))}
                </Flex>
            </Flex>
        }
        return <></>
    }

    const renderValProvider = (vp: ValueProvider | null): React.ReactNode => {
        if (vp) {
            if (vp.expression) {
                return <ExpressionComponent onSave={(v) => updateExpressionHook.mutateAsync({id:asserton_id, leftOrRight: left_or_right, expression: v})} customer_id={customer_id} test_case_id={test_case_id} action_order={null} initialInput={vp.expression.value} />
            } else {
                return <CodeComponent2 data={vp.value} />
            }
        }
        return <></>
    }

    return <Flex vertical>
        <Radio.Group defaultValue={tab}>
            <Radio.Button onClick={() => setTab("exp")} value={"exp"}>Expression</Radio.Button>
            <Radio.Button onClick={() => setTab("func")} value={"func"}>Function</Radio.Button>
        </Radio.Group>
        {tab === "exp" ? renderValProvider(item.value_provider) : renderFunction()}
    </Flex>
}