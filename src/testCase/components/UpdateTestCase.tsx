import {
    EditOutlined,
} from '@ant-design/icons';
import { Button, Form, FormProps, Input, message, Modal } from "antd";
import { useState } from "react";
import { UpdateTestCasePayload, useUpdateTestCase } from "../hooks/testCaseHooks";
import { mutateRun } from '../../run';

export interface UpdateTestCaseProps {
    id: string,
    initialName: string | undefined,
    description: string | undefined,
}

export default function UpdateTestCase({ id, initialName, description }: UpdateTestCaseProps) {
    const updateHook = useUpdateTestCase(id);
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

    const onFinish: FormProps<UpdateTestCasePayload>['onFinish'] = (values) => {
        console.log(values);
        updateHook.mutate(values);
        if(updateHook.isError) {
            message.error(new String(updateHook.error))
        } else {
            setIsModalOpen(false);
        }
    };

    const onFinishFailed: FormProps<UpdateTestCasePayload>['onFinishFailed'] = (errorInfo) => {
        console.log(errorInfo);
        message.error(new String(errorInfo))
    };

    return <><Button icon={<EditOutlined />} onClick={showModal}></Button>
        <Modal title="Update Test Case" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={<Button loading={updateHook.isLoading} form="updateTestCase" type="primary" htmlType="submit">
            Save
        </Button>}>
            <Form
                id="updateTestCase"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ name: initialName, description: description }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                validateMessages={{
                    required: "${name} is required!",
                    string: {
                        max: "${name} must be shorter"
                    }
                }}
            >
                <Form.Item<UpdateTestCasePayload>
                    label="Name"
                    name="name"
                    rules={[{ max: 50, required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<UpdateTestCasePayload>
                    label="Description"
                    name="description"
                    rules={[{ max: 200, required: true }]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal></>


}