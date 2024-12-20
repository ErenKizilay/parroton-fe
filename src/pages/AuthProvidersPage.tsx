import { Box, Stack } from "@mui/material";
import AuthProviderComponent from "../components/AuthProvider";
import { useAuthProvidersQuery } from "../hooks/hook";


export default function AuthProvidersPage() {

    const { data: auth_providers } = useAuthProvidersQuery("eren", null)

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', alignItems: "flex-start" }}>
                {auth_providers?.map(a => {
                    return <AuthProviderComponent key={a.id} provider={a}></AuthProviderComponent>
                })}
            </Box>
    );
}