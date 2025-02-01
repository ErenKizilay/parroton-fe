import React from "react";
import CodeComponent2 from "../../common/components/CodeComponent2";
import ExpressionComponent from "../../common/components/ExpressionComponent";
import { useUpdateAssertionExpression } from "../hooks/assertionHooks";
import { ValueProvider } from "../types/assertionTypes";


export interface ValueProviderProps {
    customer_id: string
    test_case_id: string
    assertion_id: string,
    left_or_right: "left" | "right",
    value_provider: ValueProvider
}

export default function ValueProviderComponent({ customer_id, test_case_id, assertion_id, left_or_right, value_provider }: ValueProviderProps) {
    const updateExpressionHook = useUpdateAssertionExpression(test_case_id);
    const render = (): React.ReactNode => {
        if (value_provider.expression) {
            return <ExpressionComponent
                onSave={(v) => updateExpressionHook.mutateAsync({ id: assertion_id, leftOrRight: left_or_right, expression: v })}
                customer_id={customer_id}
                test_case_id={test_case_id}
                action_order={null}
                initialInput={value_provider.expression?.value} />;
        } else {
            return <CodeComponent2 data={value_provider.value} copyable={false} />
        }
    }

    return render();
}