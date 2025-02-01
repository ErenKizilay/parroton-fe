import { Button, Select } from "antd";
import Flex from "antd/es/flex";
import React, { useState } from "react";
import { Function, Operation } from "../types/assertionTypes";
import ValueProviderComponent from "./ValueProviderComponent";
import {
    HomeOutlined,
    LoadingOutlined,
    MinusOutlined,
    PlusOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
  } from '@ant-design/icons';


export interface FunctionCompProp {
    customer_id: string,
    test_case_id: string,
    assertion_id: string,
    left_or_right: "left" | "right",
    assertion_function: Function,
}

export default function FunctionComponent({ customer_id, test_case_id, assertion_id, left_or_right, assertion_function }: FunctionCompProp) {
    const [parameters, setParameters] = useState(assertion_function.parameters);

    const paramsContent = (): React.ReactNode => {
        return parameters.map((vp, index) => <Flex>
            <ValueProviderComponent
                customer_id={customer_id}
                test_case_id={test_case_id}
                assertion_id={assertion_id}
                left_or_right={left_or_right}
                value_provider={vp} />
            <Button icon={<MinusOutlined />} size="small" onClick={(e) => {
                setParameters((prev) => {
                    return prev.filter((p, i) => i !== index);
                })
            }}/>
        </Flex>)
    }

    const render = (): React.ReactNode => {
        return <Flex vertical gap={2} align="center">
            <Flex style={{width: "100%"}}>
                <Select value={Operation.Sum} style={{ width: "100%" }} options={[
                    { value: Operation.Sum, label: "Sum" },
                    { value: Operation.Avg, label: "Avarage" },
                    { value: Operation.Count, label: "Count" },
                ]} />
                <Button icon={<PlusOutlined />} onClick={(e) => {
                    setParameters((prev) => {
                        const newParams = [...prev]
                        newParams.push({
                            value: null,
                            expression: {
                                value: "$.xxx"
                            }
                        });
                        return newParams;
                    })
                }}/>
            </Flex>
            <Flex vertical>
                {paramsContent()}
            </Flex>
        </Flex>
    }

    return render();
}