import { useEffect, useImperativeHandle } from 'react';
import isEmpty from 'lodash/isEmpty';

import { Form, Button, Spin } from 'antd';

export const LabelTip = ({ style = {}, children }: { style?: any; children: any }) => (
    <div className="label" style={style}>
        {children}
        <style jsx>{`
            .label {
                padding: 0.5em;
                margin: 1.5em 0;
                font-size: 0.8em;
                color: #666;
                font-weight: 700;
                border-top: 1px dashed #ddd;
                background: #dfdfdf;
            }
            :global(.label .extra) {
                color: #999;
                margin-left: 10px;
                font-weight: 400;
            }
        `}</style>
    </div>
);

export const Title = ({ sub = '', children }) => (
    <div className="title-wrapper">
        <span className="title">{children}</span>
        <span className="sub">{sub}</span>
        <style jsx>{`
            .title-wrapper {
                display: flex;
                align-items: center;
                padding: 0.5em 0.6em;
                border-left: 4px solid #096dd9;
                border-bottom: 1px solid #ddd;
                margin-bottom: 1em;
            }
            .title {
                font-size: 1.5em;
                font-weight: 700;
            }
            .sub {
                margin-left: 1.5em;
                font-size: 0.8em;
            }
        `}</style>
    </div>
);

export const FormLayout = {
    xl: 6,
    lg: 8,
    sm: 12,
    xs: 24,
    wrapperCol: { span: 16 },
    labelCol: { span: 8 },
};

export const HalfFormLayout = {
    xl: 12,
    sm: 24,
    xs: 24,
    wrapperCol: { span: 20 },
    labelCol: { span: 4 },
};

export const FullFormLayout = {
    span: 24,
    wrapperCol: { span: 20 },
    labelCol: { span: 2 },
};

interface PageFormProps {
    t;
    onCancel?;
    onOk?;
    onReset?;
    onChange?;
    pageTitle;
    subTitle?;
    childs;
    loading?;
    resetBtnProps?;
    okBtnProps?;
    cancelBtnProps?;
    formRef?;
    defaultVal?;
}
export const FormPage = ({
    t,
    pageTitle,
    childs,
    loading = false,
    onOk,
    onCancel,
    onChange,
    resetBtnProps = {},
    okBtnProps = {},
    cancelBtnProps = {},
    formRef,
    defaultVal,
    subTitle,
}: PageFormProps) => {
    const [form] = Form.useForm();
    useImperativeHandle(formRef, () => ({
        form,
    }));

    useEffect(() => {
        if (form) {
            form.setFieldsValue(defaultVal);
        }
    }, [defaultVal, form]);

    const onReset = () => {
        if (isEmpty(defaultVal)) {
            form.resetFields();
        } else {
            form.setFieldsValue(defaultVal);
        }
    };

    return (
        <Form form={form} onFinish={onOk} onValuesChange={onChange}>
            <Spin spinning={loading}>
                <Title sub={subTitle}>{pageTitle}</Title>
                {childs?.map((child, idx) => (
                    <div key={child.label}>
                        <LabelTip>
                            {idx + 1}.{' '}
                            <span dangerouslySetInnerHTML={{ __html: child.label }}></span>
                            <span className="extra">{child.extraLabel}</span>
                        </LabelTip>

                        {child.tipAlert}
                        {child.comp}
                    </div>
                ))}
                <Form.Item className="footer-item">
                    <Button {...cancelBtnProps} onClick={onCancel}>
                        {t('common:cancel')}
                    </Button>
                    <Button {...resetBtnProps} onClick={onReset}>
                        {t('common:reset')}
                    </Button>
                    <Button {...okBtnProps} type="primary" htmlType="submit">
                        {t('common:submit')}
                    </Button>
                </Form.Item>
            </Spin>
            <style jsx>{`
                :global(.footer-item) {
                    margin-top: 2em;
                    border-top: 1px solid #ddd;
                    padding-top: 1.5em;
                }
                :global(.footer-item .ant-btn) {
                    border-radius: 0;
                    padding-left: 2em;
                    padding-right: 2.5em;
                    margin-right: 1em;
                }
            `}</style>
        </Form>
    );
};
