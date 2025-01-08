import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, GetProp, Input, message, Typography, Upload, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function UploadHar() {
    const [urls, setUrls] = useState<string[]>([]);
    const [exclusions, setExclusions] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
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
                setUrls(res.data)
            })
    }


    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file as FileType);
        });
        formData.append('name', name);
        formData.append('description', description);
        formData.append("excluded_paths", exclusions)
        setUploading(true);
        
        axiosInstance.postForm("/test-cases", formData)
            .then((res) => {
                navigate(`/test-cases/`)
            })
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
        maxCount: 1
    };

    return <Flex>
        <Form
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
            <Form.Item label="Har file" required>
                <Upload {...props}>
                    <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                </Upload>
            </Form.Item>
            <Form.Item label="Exclusions">
                <Input onChange={(e) => setExclusions(e.target.value)}></Input>
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </Form.Item>
        </Form>
        <Flex vertical>
            {urls.map(u => <Typography.Text copyable code>{u}</Typography.Text>)}
        </Flex>
    </Flex>
}