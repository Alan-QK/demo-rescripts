import { Form, InputNumber, Select } from 'antd';

export default function CompactInput(props) {
    const {
        label,
        addon_key,
        isRequired,
        layout,
        addonOptions,
        name,
        rules,
        ...otherProps
    } = props;

    return (
        <Form.Item label={label} {...layout} required={isRequired}>
            <div className="d-flex">
                <Form.Item name={name} rules={rules} noStyle>
                    <InputNumber {...otherProps} style={{ width: '60%', borderRight: 'none' }} />
                </Form.Item>

                <Form.Item noStyle name={addon_key || '_unit'}>
                    <Select style={{ width: '40%' }}>
                        {addonOptions?.map((i) => (
                            <Select.Option key={i.key} value={i.key}>
                                {i.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>
        </Form.Item>
    );
}
