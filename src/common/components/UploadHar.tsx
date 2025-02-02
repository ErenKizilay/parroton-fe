import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Empty, Flex, Form, GetProp, Input, Row, Select, SelectProps, Typography, Upload, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthProvidersQueryWithUrls } from '../../auth/hooks/hooks';
import axiosInstance from '../../utils/axios';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function UploadHar() {
    const [urls, setUrls] = useState<string[]>([]);
    const [authProviders, setAuthProviders] = useState<string[]>([]);
    const [exclusions, setExclusions] = useState<string>("");
    const [uploadError, setUploadError] = useState();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [options, setOptions] = useState<SelectProps['options']>([]);
    const { data, isLoading } = useAuthProvidersQueryWithUrls(urls.map(u => new URL(u).origin))
    const navigate = useNavigate();

    useEffect(() => {
        if (!uploading && fileList.length > 0) {
            filterPaths();
        }
    }, [uploading, exclusions, fileList]);

    const filterPaths = () => {
        const data = new FormData();
        data.append("excluded_paths", exclusions)
        fileList.forEach((file) => {
            data.append('file', file as FileType);
        });
        axiosInstance.postForm("/filter-paths", data)
            .then((res) => {
                const result = res.data as string[]
                setUrls(result);
                const parts: string[] = Array.from(new Set(result.flatMap(u => {
                    return u.split(/[/.]/)
                        .filter(p => p.length > 0)
                        .filter(p => !p.includes(":"))
                })));
                parts.forEach(p => options?.push({ label: p, value: p }))
            })
    }



    const handleUpload = () => {
        setUploadError(undefined);
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file as FileType);
        });
        formData.append('name', name);
        formData.append('description', description);
        formData.append("excluded_paths", exclusions)
        formData.append("auth_providers", authProviders.join(","))
        setUploading(true);

        axiosInstance.postForm("/test-cases", formData)
            .then(() => {
                navigate(`/test-cases/`)
            }).catch((e) => {
                setUploading(false);
                setUploadError(e);
            })
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
            setOptions([]);
            setUrls([]);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
        maxCount: 1
    };

    return <Row gutter={16}>
        <Col span={6}>
            <Flex vertical align="center">
                <Typography.Text strong>Case Details</Typography.Text>
                <Form
                    title='Case details'
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Name" required>
                        <Input onChange={(e) => setName(e.target.value)}></Input>
                    </Form.Item>
                    <Form.Item label="Description" required>
                        <Input.TextArea onChange={(e) => setDescription(e.target.value)}></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="HAR file" required>
                        <Upload {...props}>
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Exclusions">
                        <Select mode="multiple" options={options} onChange={(value: string | string[]) => {
                            setExclusions(Array.isArray(value) ? value.join(", ") : value);
                        }} />
                    </Form.Item>
                    <Form.Item label="Auth Providers">
                        <Select mode="multiple" onChange={(val) => setAuthProviders(val)} loading={isLoading} options={data?.map(a => {
                            let option = {
                                label: a.base_url,
                                value: a.id,
                            };
                            return option;
                        })} />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileList.length === 0 || name.length === 0 || description.length === 0}
                            loading={uploading}
                            style={{ marginTop: 16 }}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                        {uploadError ? <Typography.Text>{uploadError}</Typography.Text> : ''}
                    </Form.Item>
                </Form>
            </Flex>
        </Col>
        <Col span={18}>
            <Flex vertical align="center">
                <Typography.Text strong>Endpoints</Typography.Text>
                <Divider />
                <Flex vertical>
                    {urls.length > 0 ? urls.map(u => <Typography.Text copyable code>{u}</Typography.Text>) :
                        <Empty description={"Add file to see endpoints"} />}
                </Flex>
            </Flex>
        </Col>
    </Row>
}