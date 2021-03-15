import { withTranslation } from '@i18n';
import { Form, Row, Col, Button } from 'antd';

import { FormItemProps, RenderComp, BASIC_TYPES } from '../CustomFormItems';
import { getVal } from 'utils/index';

export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

export const FormLayout = {
    xxl: 12,
    xl: 12,
    lg: 12,
    md: 24,
    sm: 24,
    xs: 24,
    wrapperCol: { span: 16 },
    labelCol: { span: 8 },
};

export const FullRowLayout = {
    span: 24,
    wrapperCol: { xxl: 20, xl: 20, lg: 20, md: 16, sm: 16, xs: 16 },
    labelCol: { xxl: 4, xl: 4, lg: 4, md: 8, sm: 8, xs: 8 },
};

interface Props {
    t: any;
    formItems: Array<FormItemProps | any>;
    submitFn: (param?: any) => void;
    cancelFn: (param?: any) => void;
    defaultVal?: any;
    subBtn?: {
        type: any;
        label: any;
    };
    cancelBtn?: {
        type: any;
        label?: any;
    };
}

export const ItemNotForm = ({ layout, label, value }) => {
    const { labelCol = { span: 8 }, wrapperCol = { span: 16 }, ...col_layout } = layout;
    return (
        <Col {...col_layout}>
            <Row className="t-row">
                <Col {...labelCol} className="t-col">
                    {label}
                </Col>
                <Col {...wrapperCol}>{value}</Col>
            </Row>
            <style jsx>{`
                :global(.t-row) {
                    line-height: 38px;
                    margin-bottom: 1em;
                }

                :global(.t-col) {
                    text-align: right;
                    padding-right: 10px;
                    color: #999;
                }
            `}</style>
        </Col>
    );
};

export const RenderItem = ({ t, itemProps, initVal = undefined }) => {
    const { type = 'input', layout = { span: 24 }, label, key, isRequired, rules } = itemProps;

    const { labelCol = { span: 8 }, wrapperCol = { span: 16 } } = layout;

    const allRules = isRequired
        ? [
              {
                  required: true,
                  message: t(
                      type && ['select', 'radio'].includes(type)
                          ? 'common:placeholder.select'
                          : 'common:placeholder.input',
                      { name: label }
                  ),
              },
              ...(rules ?? []),
          ]
        : rules;

    const isBasicInputType = BASIC_TYPES.includes(type);

    return (
        <Form.Item
            colon={false}
            label={label}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            required={isRequired}
            rules={allRules}
            noStyle={!isBasicInputType}
            initialValue={initVal}
            {...(!isBasicInputType ? {} : { name: key, rules: allRules })}
        >
            {isBasicInputType ? (
                <RenderComp t={t} item={{ ...itemProps }} />
            ) : (
                <RenderComp
                    t={t}
                    item={{
                        ...itemProps,
                        label,
                        rules: allRules,
                        isRequired,
                        layout: { labelCol, wrapperCol },
                    }}
                />
            )}
        </Form.Item>
    );
};

export const RenderFormBody = ({
    t,
    formItems,
    defaultVal,
}: {
    t;
    formItems: Array<FormItemProps>;
    defaultVal?;
}) => (
    <Row>
        {formItems?.map((item: FormItemProps) => {
            const { notForm, ...itemProps } = item;
            const { layout = { span: 24 }, label, key, render } = itemProps;
            const { ...col_layout } = layout;
            if (notForm) {
                return (
                    <ItemNotForm
                        key={key}
                        layout={layout}
                        label={label}
                        value={render ?? getVal(defaultVal, [itemProps.key])}
                    />
                );
            }
            return (
                <Col key={key} {...col_layout}>
                    {render ?? (
                        <RenderItem t={t} itemProps={itemProps} initVal={defaultVal?.[key]} />
                    )}
                </Col>
            );
        })}
    </Row>
);

// eslint-disable-next-line
const DynamicForm = (props: Props & any) => {
    const {
        t,
        formItems,
        submitFn,
        cancelFn,
        defaultVal,
        subBtn = {
            type: 'primary',
            label: '确认',
        },
        cancelBtn = {
            type: 'default',
            label: '取消',
        },
    } = props;
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        submitFn(values);
    };

    // 默认数据修改后同步修改表单对应的项

    return (
        <Form
            form={form}
            className="dynamic-form"
            {...formItemLayout}
            onFinish={handleSubmit}
            initialValues={defaultVal}
        >
            <RenderFormBody {...{ t, formItems, defaultVal }} />
            {/* {(t, formItems, defaultVal)} */}
            <Form.Item wrapperCol={{ offset: 7 }} className="form-footer">
                <Button type={subBtn.type} className="f-btn" htmlType="submit">
                    {subBtn.label}
                </Button>
                {!!cancelBtn && <a onClick={cancelFn}>{cancelBtn.label}</a>}
            </Form.Item>

            <style jsx global>{`
                .dynamic-form {
                    width: 400;
                    margin: auto;
                }

                .dynamic-form .form-footer {
                    margin-top: 2em;
                }

                .dynamic-form .f-btn {
                    margin-right: 24px;
                }
            `}</style>
        </Form>
    );
};

export default withTranslation('common')(DynamicForm);
