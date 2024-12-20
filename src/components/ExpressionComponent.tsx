import { Autocomplete, TextField } from "@mui/material";

export interface Props {
    value: String
}

export default function ActionComponent({ value }: Props) {

    return <>
        <Autocomplete
            renderInput={(params) => <TextField {...params} />}
            onInputChange={(event, newValue) => {
                // Update suggestions dynamically
                //(newValue);
            } } options={[]}        />
    </>
}