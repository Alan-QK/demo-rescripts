import { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';
import { Modal, Form, Input, Tabs, Button } from 'antd';

const BatchSearchModal = ({ t, visible, batchCallbackFn, params = {}, filterItems }) => {
    // const [batchParams, setBatchParams] = useState(params);
    const [form] = Form.useForm();
    const submitFn = () => {
        const batchParams = form.getFieldsValue();
        const finalParams = Object.keys(batchParams).reduce((o, k) => {
            let v = batchParams[k];
            if (isUndefined(v)) {
                return o;
            }
            v = v
                .trim()
                .replace(/(\r\n)|(\n)/g, ',')
                .replace(/,,/g, ',');
            return { ...o, [k]: v };
        }, {});
        batchCallbackFn(true, finalParams);
    };

    const resetForm = () => {
        form.resetFields();
        batchCallbackFn(true, form.getFieldsValue());
    };

    useEffect(() => {
        if (visible) {
            form.setFieldsValue(
                filterItems.reduce((vals, item) => {
                    let v = params[item.key];
                    if (!isUndefined(v)) {
                        v = v.trim().replace(/,/g, '\n');
                    }
                    return { ...vals, [item.key]: v };
                }, {})
            );
        }
    }, [visible]);
    return (
        <Modal
            title={t('common:search.batch')}
            visible={visible}
            onCancel={() => batchCallbackFn(false)}
            footer={[
                <Button key="reset" onClick={resetForm}>
                    {t('reset')}
                </Button>,
                <Button key="cancel" onClick={() => batchCallbackFn(false)}>
                    {t('cancel')}
                </Button>,
                <Button key="ok" type="primary" onClick={submitFn}>
                    {t('search.label')}
                </Button>,
            ]}
        >
            <Form form={form}>
                <Tabs defaultActiveKey="order_ids" tabPosition="left" tabBarGutter={0} size="small">
                    {filterItems.map((item) => (
                        <Tabs.TabPane
                            key={item.key}
                            tab={<span style={{ width: '100px' }}>{item.label}</span>}
                        >
                            <Form.Item name={item.key} className="full-width">
                                <Input.TextArea placeholder={t('search.batch_tip')} rows={8} />
                            </Form.Item>
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </Form>
        </Modal>
    );
};

export default BatchSearchModal;
