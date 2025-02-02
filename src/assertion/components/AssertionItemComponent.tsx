import { Flex, Radio } from "antd";
import React, { useState } from "react";
import { AssertionItem, Function, Operation, ValueProvider } from "../types/assertionTypes";
import FunctionComponent from "./FunctionComponent";
import ValueProviderComponent from "./ValueProviderComponent";

export interface AssertionItemProps {
    customer_id: string,
    test_case_id: string,
    asserton_id: string,
    left_or_right: "left" | "right",
    item: AssertionItem,

}

export default function AssertionItemComponent({ customer_id, test_case_id, item, left_or_right, asserton_id }: AssertionItemProps) {
    const [tab, setTab] = useState(item.function ? "func" : "exp");

    const renderFunction = (): React.ReactNode => {
        const assertion_func: Function = item.function ? item.function : {
            operation: Operation.Sum,
            parameters: []
        }
        return <FunctionComponent
            customer_id={customer_id}
            test_case_id={test_case_id}
            assertion_id={asserton_id}
            left_or_right={left_or_right}
            assertion_function={assertion_func} />
    }

    const renderValProvider = (vp: ValueProvider | null): React.ReactNode => {
        if (vp) {
            return <ValueProviderComponent
                customer_id={customer_id}
                test_case_id={test_case_id}
                assertion_id={asserton_id}
                left_or_right={left_or_right}
                value_provider={vp} />
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