import React from "react";
import { useParams } from "react-router-dom";
import AuthProviderDetails from '../auth/components/AuthProviderDetails';
import { useAuthProviderQuery } from '../auth/hooks/hooks';
import DataLoaderComponent from "../common/components/DataLoaderComponent";

export default function AuthProviderPage() {
    const { id } = useParams();
    const { data, isLoading, error } = useAuthProviderQuery(id!);

    const render = (): React.ReactNode => {
        return <>
            <AuthProviderDetails authProvider={data!} />
        </>
    }

    return <>
        <DataLoaderComponent isLoading={isLoading} error={error} render={render} />
    </>
}