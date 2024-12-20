import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Card, CardActions, CardContent, Chip, Collapse, IconButton, IconButtonProps, styled, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { Action, ParameterType } from "../types/models";
import ParameterList from "./ParameterList";
import { ExpandMore } from './ExpandMoreButton';



export interface Params {
    action: Action
}

export default function ActionComponent({ action }: Params) {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [parameterType, setParameterType] = useState<ParameterType>(ParameterType.Input);

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: ParameterType,
    ) => {
        setParameterType(newAlignment);
    };

    const handleExpandClick = () => {
        setShowDetails(!showDetails);
    };

    const buildActionDetails = (): ReactNode => {
        if (showDetails) {
            return <>
                <ToggleButtonGroup
                    value={parameterType}
                    exclusive
                    onChange={handleAlignment}>
                    <ToggleButton value={ParameterType.Input}>
                        <Typography>Input</Typography>
                    </ToggleButton>
                    <ToggleButton value={ParameterType.Output}>
                        <Typography>Output</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
                <ParameterList action={action} parameter_type={parameterType}></ParameterList>
            </>
        }

        return <>
        </>
    }

    const buildMethod = (): ReactNode => {

        const methodColors: Record<string, "default" | "primary" | "secondary" | "error" | "warning" | "info" | "success"> = {
            GET: "info",
            POST: "warning",
            PUT: "primary",
            DELETE: "error",
            PATCH: "success",
            OPTIONS: "secondary",
            HEAD: "default",
        };

        return <Chip
            color={methodColors[action.method as string]}
            label={action.method}
        />
    }

    return <>
        <Card key={action.id} sx={{ width: "%100" }}>
            <CardContent>
                <Box
                    sx={{
                        gap: 2,
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    {buildMethod()}
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {action.name}
                    </Typography>
                    <Tooltip title={action.url}>
                        <Typography
                            variant="body2"
                        >
                            {action.url}
                        </Typography>
                    </Tooltip>
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
                    {buildActionDetails()}
                </CardContent>
            </Collapse>
        </Card>
    </>
}