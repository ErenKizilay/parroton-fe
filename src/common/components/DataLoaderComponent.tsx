import { Result, Skeleton } from "antd";
import { AxiosError } from "axios";
import React from "react";

export interface DataLoaderProps {
    isLoading: boolean,
    error: any,
    errorResultTitle?: string
    render: () => React.ReactNode
}

interface ErrorResponse {
    message: string;
}

export default function DataLoaderComponent({ isLoading, error, errorResultTitle, render }: DataLoaderProps) {
    const content = (): React.ReactNode => {
        if (isLoading) {
            return <Skeleton>

            </Skeleton>
        }
        if (error) {
            let errorMessage;
            if(error instanceof AxiosError) {
                errorMessage = ((error as AxiosError).response?.data as ErrorResponse)?.message || error.message;
            } else {
                errorMessage = new String(error)
            }
            return <Result
                status="error"
                title={errorResultTitle ? errorResultTitle : 'Could not load data!'}
                subTitle={errorMessage}
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