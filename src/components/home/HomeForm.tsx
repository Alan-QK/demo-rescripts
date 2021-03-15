import { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Form, Input, Button } from 'antd';

import CaptchaItem from '../CustomFormItems/CaptchaItem';
import PhoneItem from '../CustomFormItems/PhoneItem';

export function HandleError(error, values, errTip) {
    const errors = Object.keys(error).reduce((obj, key) => {
        return {
            ...obj,
            [key]: [values[key], errTip[key]],
        };
    }, {});
    return errors;
}

const RenderFormItem = (props) => {
    const { type, ...itemProps } = props;
    switch (type) {
        case 'phone':
            return <PhoneItem {...props} />;
        case 'password':
            return (
                <Input.Password
                    className="lg-input"
                    autoComplete="new-password"
                    bordered={false}
                    {...itemProps}
                />
            );
        case 'captcha':
            return <CaptchaItem {...props} />;
        default:
            return (
                <Input
                    className="lg-input"
                    autoComplete="new-password"
                    bordered={false}
                    {...itemProps}
                />
            );
    }
};

interface HomeFormProps {
    items;
    onOk;
    okBtnText?;
    extra?;
    loading?;
    errors?;
    isShouldReset?;
}

export default function HomeForm({
    items,
    onOk,
    okBtnText,
    extra,
    loading,
    errors,
    isShouldReset,
}: HomeFormProps) {
    const [form] = Form.useForm();
    const submitFn = (values) => {
        onOk(values);
    };

    useEffect(() => {
        if (!isEmpty(errors)) {
            form.setFields(
                Object.keys(errors).map((key) => ({
                    name: key,
                    value: errors[key][0],
                    errors: [errors[key][1] || '输入错误'],
                }))
            );
        }
    }, [errors]);

    useEffect(() => {
        form.resetFields();
    }, [isShouldReset]);

    const toggleLabelState = ({ target }, event) => {
        const labelDom = document.getElementById(`form_label_${target.id}`);

        if (labelDom) {
            labelDom.style.color = event === 'focus' ? '#4077d3' : '#666';
        }
    };

    return (
        <Form form={form} onFinish={submitFn}>
            {items?.map((i) => {
                const { label = '', prefix, isCompact, ...props } = i;
                const { key, rules, ...basicProps } = props;
                return (
                    <Form.Item noStyle key={key}>
                        <p className="form-item-label" id={`form_label_${key}`}>
                            {prefix}
                            <span>{label}</span>
                        </p>
                        <Form.Item
                            name={key}
                            rules={rules}
                            {...(isCompact ? {} : { name: key, rules })}
                        >
                            <RenderFormItem
                                onFocus={(e) => toggleLabelState(e, 'focus')}
                                onBlur={(e) => toggleLabelState(e, 'blur')}
                                {...(isCompact ? props : basicProps)}
                            />
                        </Form.Item>
                    </Form.Item>
                );
            })}
            <Form.Item>
                <div className="flex-wrapper">{extra?.prefix}</div>
                <Button block htmlType="submit" type="primary" size="large" loading={loading}>
                    {okBtnText ?? '确定'}
                </Button>
                <div style={{ fontSize: '16px', marginTop: 20 }}>{extra?.suffix}</div>
            </Form.Item>

            <style jsx>{`
                .flex-wrapper {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    margin-bottom: 1.5em;
                }
                .form-item-label {
                    color: #666;
                }
                .form-item-label > span {
                    font-size: 0.8em;
                    margin-left: 0.5em;
                }
                :global(.ant-form-item-control-input-content .lg-input) {
                    height: auto;
                    backgrounf: #fff;
                    border-bottom: 1px solid #ddd;
                    border-radius: none important;
                    box-shadow: none important;
                    outline: none important;
                    padding-left: 0;
                    padding-right: 0;
                }
                :global(.ant-form-item-control-input-content .lg-input .ant-input) {
                    line-height: 1.7em;
                }

                :global(.ant-form-item-control-input-content .lg-input .ant-input-group-addon) {
                    border: none;
                    background-color: #fff;
                    padding-left: 0;
                    padding-right: 0;
                }
                :global(.lg-input:active),
                :global(.lg-input:focus),
                :global(.lg-input:hover) {
                    border-bottom: 1px solid #4077d3;
                }
                :global(.lg-input:active),
                :global(.lg-input:focus),
                :global(.lg-input:hover),
                :global(.lg-input input:focus) {
                    box-shadow: none !important;
                }
                :global(.ant-form-item-control-input-content .lg-input.ant-input.phone-input) {
                    position: relative;
                    line-height: 1.7em;
                    padding-left: 7em;
                }
                :global(.ant-form-item-explain) {
                    text-align: right;
                    font-size: 0.8em;
                }
            `}</style>
        </Form>
    );
}
