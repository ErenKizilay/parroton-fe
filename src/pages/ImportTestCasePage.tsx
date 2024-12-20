import { Button, Divider, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useMutateTestCase } from "../hooks/hook";


type HarRequest = {
    request: {
        url: string;
    };
};

type HarFile = {
    log: {
        entries: HarRequest[];
    };
};


export default function ImportTestCasePage() {
    const [endpointExclusion, setEndpointExclusion] = useState<string>("");
    const [name, setName] = useState<string>();
    const [endpoints, setEndpoints] = useState<string[]>([]);
    const [description, setDescription] = useState<string>();
    const [fileContent, setFileContent] = useState<string>();
    const [file, setFile] = useState<File | null>(null);
    const [fileCloned, setFileCloned] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const testCaseMutator = useMutateTestCase(() => {
        const formData = new FormData();
        formData.append('file', fileCloned!);
        formData.append('name', name!);
        formData.append('description', description!);
        formData.append('excluded_paths', endpointExclusion);
        return formData;
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files) {
            const originalFile = event.target.files[0];
            setFile(originalFile);
            const clonedFile = new File([originalFile], originalFile.name, {
                type: originalFile.type,
                lastModified: originalFile.lastModified,
            });
            setFileCloned(clonedFile);
        }
    };

    const extractUrlsFromHar = (har: HarFile): string[] => {
        // Map over the entries to extract URLs from the request objects
        return har.log.entries.map(entry => entry.request.url);
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file before uploading.');
            return;
        }

        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension !== 'har') {
            alert("Only har files are supported!")
        }

        const reader = new FileReader();
        reader.onload = () => {
            setFileContent(reader.result as string); // Set file content as string
        };
        reader.readAsText(file);
        if (fileContent) {
            const har = JSON.parse(fileContent);
            setEndpoints(extractUrlsFromHar(har as HarFile))
        }
    };
    const handleSave = (e: MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        testCaseMutator.mutate();
    }

    return <>
        <Stack gap={1}>
            <TextField
                error={name === null}
                id="outlined-error"
                label="Name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                error={description === null}
                id="outlined-error"
                label="Description"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Stack direction={"row"}>
                <input type="file" onChange={handleFileChange} />
                <Button onClick={(e) => handleFileUpload(e)}>Upload</Button>
            </Stack>
            <Stack direction={"row"}>
                <TextField
                    error={endpointExclusion === null}
                    id="outlined-error"
                    label="Endpoint exclusions"
                    defaultValue={endpointExclusion}
                    onChange={(e) => setEndpointExclusion(e.target.value)}
                />
                <Button onClick={(e) => handleSave(e)}>Save</Button>
            </Stack>
            <Stack>
                {endpoints
                    .filter(e => endpointExclusion.length === 0 || !endpointExclusion.split(",").some(part => e.includes(part)))
                    .map((e, i) => <>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="h6">{i + 1} - {e}</Typography>
                                <Divider></Divider>
                            </ListItemText>
                        </ListItem>
                    </>)}
            </Stack>
        </Stack>
    </>
}