import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { SetAuthHeaderPayload, useAddAuthHeaderProvider } from "../hooks/hooks";

export interface AddAuthHeaderProps {
    auth_provider_id: string
}

export default function AddAuthHeader({ auth_provider_id }: AddAuthHeaderProps) {
    const [form] = Form.useForm();
    const updateHook = useAddAuthHeaderProvider(auth_provider_id);
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
        <><Button icon={<PlusOutlined />} onClick={showModal}></Button>
            <Modal
                //centered
                width={"100%"}
                title="Add header"
                open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel}
                footer={<Button loading={updateHook.isLoading} form="addAuthHeaderForm" type="primary" htmlType="submit">
                    Add
                </Button>}>
                <Form
                    id='addAuthHeaderForm'
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    initialValues={{ headers: [{}] }}
                    onFinish={(values) => {
                        const payload = values as SetAuthHeaderPayload;
                        updateHook.mutate(payload);
                    }}

                >
                    <Form.Item<SetAuthHeaderPayload> rules={[{
                        required: true,
                        min: 1,
                        max: 20
                    }]} label="Name" name={'name'}>
                        <Input />
                    </Form.Item>
                    <Form.Item<SetAuthHeaderPayload> rules={[{
                        required: true,
                        min: 1,
                        max: 2000
                    }]} label="Value" name={'value'}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};