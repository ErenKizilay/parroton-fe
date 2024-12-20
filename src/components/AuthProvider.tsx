import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Card, CardActions, CardContent, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { AuthProvider } from "../types/models";
import { ExpandMore } from "./ExpandMoreButton";


export interface Params {
    provider: AuthProvider
}

export default function AuthProviderComponent({ provider }: Params) {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const handleExpandClick = () => {
        setShowDetails(!showDetails);
    };
    return <>
        <Card key={provider.id} sx={{ width: "%100" }}>
            <CardContent>
                <Box
                    sx={{
                        gap: 2,
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {provider.base_url}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={showDetails}
                    onClick={handleExpandClick}
                    aria-expanded={showDetails}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={showDetails} timeout="auto" unmountOnExit>
                <CardContent>
                    {provider && provider.headers_by_name ?
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Value</TableCell>
                                        <TableCell align="left">Disabled</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.from(Object.entries(provider.headers_by_name)).map(([key, header]) => (
                                        <>
                                            <TableRow>
                                                <TableCell align="left">{key}</TableCell>
                                                <TableCell align="left">{header.value}</TableCell>
                                                <TableCell align="left">{header.disabled}</TableCell>
                                            </TableRow>
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : ''}
                </CardContent>
            </Collapse>
        </Card>
    </>
}