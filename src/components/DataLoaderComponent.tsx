import { Result, Skeleton } from "antd";
import React from "react";

export interface Props {
    isLoading: boolean,
    error: any,
    errorResultTitle?: string
    render: () => React.ReactNode
}

export default function DataLoaderComponent({ isLoading, error, errorResultTitle, render }: Props) {
    const content = (): React.ReactNode => {
        if (isLoading) {
            return <Skeleton>

            </Skeleton>
        }
        if (error) {
            <Result
                status="error"
                title={errorResultTitle ? errorResultTitle : 'Could not load data!'}
                subTitle={new String(error)}
            />
        }
        else {
            return render();
        }
    }
    return <>
        {content()}
    </>
}