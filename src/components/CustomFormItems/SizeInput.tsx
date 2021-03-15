import { useState } from 'react';
import { Form, InputNumber, Select } from 'antd';

interface SizeValue {
    length: number;
    width: number;
    height: number;
}

interface PriceInputProps {
    t?;
    value?: SizeValue;
    onChange?: (value: SizeValue) => void;
}
const SizeGroup = ({ t, value, onChange, ...props }: PriceInputProps) => {
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const setFn = {
        length: setLength,
        width: setWidth,
        height: setHeight,
    };

    const changeVal = (val, key) => {
        const newVal = val || 0;
        if (Number.isNaN(newVal)) {
            return;
        }

        if (value && !(key in value)) {
            setFn[key]?.(newVal);
        }

        if (onChange) {
            onChange({ length, width, height, ...value, [key]: newVal });
        }
    };
    return (
        <>
            <InputNumber
                {...props}
                key="_length"
                value={value?.length || length}
                onChange={(e) => changeVal(e, 'length')}
                placeholder={t('common:size.length')}
            />
            <InputNumber
                {...props}
                key="_width"
                value={value?.width || width}
                onChange={(e) => changeVal(e, 'width')}
                placeholder={t('common:size.width')}
            />
            <InputNumber
                {...props}
                key="_height"
                value={value?.height || height}
                onChange={(e) => changeVal(e, 'height')}
                placeholder={t('common:size.height')}
            />
        </>
    );
};

export default function SizeInput(props) {
    const { t, name, rules, addon_key, addonOptions, ...otherProps } = props;

    return (
        <div className="size-input">
            <Form.Item name={`${name}`} rules={rules} noStyle>
                <SizeGroup t={t} {...otherProps} />
            </Form.Item>
            <Form.Item name={addon_key || 'size_unit'} noStyle>
                <Select {...otherProps} placeholder={''}>
                    {addonOptions?.map((i) => (
                        <Select.Option key={i.key} value={i.key}>
                            {i.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <style jsx>{`
                .size-input {
                    display: flex;
                    flex: 1;
                    // border: 1px solid #d9d9d9;
                }
                :global(.size-input > div) {
                    flex: 1;
                    border-right: none;
                    border-radius: 0;
                }
            `}</style>
        </div>
    );
}
