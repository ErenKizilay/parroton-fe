import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Typography } from "antd";
import { useState } from "react";
import { useCreateAuthProvider } from '../hooks/hooks';
import { CreteAuthProviderPayload } from "../types/authTypes";
import { useNavigate } from 'react-router-dom';

export interface CreateAuthProviderProps {

}

export default function CreateAuthProvider() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const createHook = useCreateAuthProvider((created) => {
        setIsModalOpen(false);
        navigate(`/auth-providers/` + created.id);
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <><Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Create new provider</Button>
            <Modal
                //centered
                width={"100%"}
                title="Update Test Case"
                open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel}
                footer={<Button loading={createHook.isLoading} form="createAuthProviderForm" type="primary" htmlType="submit">
                    Save
                </Button>}>
                <Form
                    id='createAuthProviderForm'
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    initialValues={{ headers: [{}] }}
                    onFinish={(values) => {
                        const payload = values as CreteAuthProviderPayload;
                        console.log(payload)
                        payload.headers = payload.headers.filter(h => h !== null);
                        createHook.mutate(payload);
                    }}

                >
                    <Form.Item<CreteAuthProviderPayload> rules={[{
                        required: true,
                        min: 3,
                        max: 20
                    }]} label="Name" name={'name'}>
                        <Input />
                    </Form.Item>

                    <Form.Item<CreteAuthProviderPayload> rules={[{
                        required: true,
                        type: "url",
                        min: 6,
                        max: 100
                    }]} label="URL" name={'url'}>
                        <Input />
                    </Form.Item>

                    {/* Nest Form.List */}
                    <Form.Item<CreteAuthProviderPayload> label="Headers">
                        <Form.List name={'headers'}>
                            {(subFields, subOpt) => (
                                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 8 }}>
                                    {subFields.map((subField) => (
                                        <Space key={subField.key}>
                                            <Form.Item noStyle name={[subField.name, 'name']}>
                                                <Input placeholder="name" />
                                            </Form.Item>
                                            <Form.Item noStyle name={[subField.name, 'value']}>
                                                <Input placeholder="value" />
                                            </Form.Item>
                                            <CloseOutlined
                                                onClick={() => {
                                                    subOpt.remove(subField.name);
                                                }} />
                                        </Space>
                                    ))}
                                    <Button type="dashed" onClick={() => subOpt.add()} block>
                                        + Add Header
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                    </Form.Item>

                    <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Typography>
                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                            </Typography>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
