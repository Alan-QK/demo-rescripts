import { useEffect } from 'react';
import { Form, Modal, Spin } from 'antd';
import { RenderFormBody, formItemLayout } from '@components/common/DynamicForm';
import { ModalProps } from 'antd/es/modal';

interface FormModalProps extends ModalProps {
    t;
    callbackFn;
    formItems;
    loading?;
    initVals?;
}

const FormModal = ({ t, callbackFn, formItems, loading, initVals, ...props }: FormModalProps) => {
    const [form] = Form.useForm();
    const submitFn = () => {
        form.validateFields()
            .then((values) => {
                callbackFn(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    useEffect(() => {
        if (!initVals) return;

        form.setFieldsValue(
            formItems.reduce((vals, item) => {
                const v = initVals[item.key];
                return { ...vals, [item.key]: v };
            }, {})
        );
    }, [initVals]);

    return (
        <Modal
            {...props}
            onOk={submitFn}
            onCancel={() => callbackFn()}
            destroyOnClose
            maskClosable={false}
            afterClose={() => form.resetFields()}
        >
            <Spin spinning={loading}>
                <Form form={form} {...formItemLayout} style={{ paddingRight: '3em' }}>
                    <RenderFormBody {...{ t, formItems }} defaultVal={initVals} />
                </Form>
            </Spin>
        </Modal>
    );
};
export default FormModal;
