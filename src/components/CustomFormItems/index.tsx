import MuiltInput from '@gui/muilt-input';
import { Input, InputNumber, Select, Radio, Checkbox, DatePicker } from 'antd';

import CompactInput from './CompactInput';
import SizeInput from './SizeInput';
import AsyncSelect from './AsyncSelect';

export interface FormItemProps {
    key: any;
    label: string;
    type?: string;
    keys?;
    multiple?: boolean;
    placeholder?: string;
    moreOptions?: any;
    options?;
    style?;
    notForm?;
    rules?;
    isRequired?;
    render?;
    isCompact?: boolean;
    layout?: any;
    addon_key?: string | Array<string | any>;
    addonOptions?: Array<{
        label: string;
        value?: any;
        [propname: string]: any;
    }>;
}

// 渲染表单元素
interface ChildTempProps {
    t?;
    value?;
    onChange?: (value) => void;
    item: FormItemProps;
    isSeniorForm?;
}

interface OptionProps {
    label: string;
    value: string;
}

const { RangePicker } = DatePicker;
export const BASIC_TYPES = [
    'input',
    'select',
    'date',
    'date-range',
    'date-time',
    'password',
    'number',
    'select',
    'textarea',
    'radio',
    'checkbox',
    'phone',
    'muilt-input',
    'async_select',
    'size-input',
];

export const RenderComp = ({ t, item, isSeniorForm, ...props }: ChildTempProps) => {
    const {
        type,
        label,
        options,
        placeholder,
        style = {},
        moreOptions = {},
        multiple,
        addon_key,
        addonOptions,
        isRequired,
        ...otherItemProps
    } = item || {};
    const otherProps = { ...props, ...moreOptions, style, ...otherItemProps };
    switch (type) {
        case 'select':
            return (
                <Select
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder={placeholder ?? t('common:placeholder.select', { name: label })}
                    {...otherProps}
                >
                    {options?.map(({ value, label, ...options }) => (
                        <Select.Option key={value} value={value} {...options}>
                            {label}
                        </Select.Option>
                    ))}
                </Select>
            );
        case 'date':
            return (
                <DatePicker
                    allowClear
                    format="YYYY-MM-DD"
                    placeholder={
                        placeholder ?? [
                            t('common:placeholder.start', { name: label }),
                            t('common:placeholder.end', { name: label }),
                        ]
                    }
                    {...otherProps}
                />
            );
        case 'date-range':
            return (
                <RangePicker
                    allowClear
                    format="YYYY-MM-DD"
                    placeholder={
                        placeholder ?? [
                            t('common:placeholder.start', { name: label }),
                            t('common:placeholder.end', { name: label }),
                        ]
                    }
                    {...otherProps}
                />
            );
        case 'date-time':
            return (
                <DatePicker
                    allowClear
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime
                    placeholder={placeholder ?? t('common:placeholder.select', { name: label })}
                    {...otherProps}
                />
            );
        case 'password': {
            return (
                <Input.Password
                    allowClear
                    placeholder={t('common:placeholder.input', { name: label })}
                    autoComplete="new-password"
                    {...otherProps}
                />
            );
        }
        case 'number': {
            return (
                <InputNumber allowClear className="full-w" placeholder={label} {...otherProps} />
            );
        }

        case 'async_select':
            return (
                <AsyncSelect
                    allowClear
                    placeholder={t('common:placeholder.select', { name: label })}
                    {...otherProps}
                />
            );
        case 'textarea':
            return (
                <Input.TextArea
                    allowClear
                    autoSize={{ minRows: 3, maxRows: 8 }}
                    placeholder={t('common:placeholder.input', { name: label })}
                    {...otherProps}
                />
            );
        case 'radio':
            return (
                <Radio.Group {...otherProps}>
                    {options?.map((item: OptionProps) => (
                        <Radio key={item.value} value={item.value}>
                            {item.label}
                        </Radio>
                    ))}
                </Radio.Group>
            );
        case 'checkbox':
            return (
                <Checkbox.Group {...otherProps}>
                    {options?.map((item: OptionProps) => (
                        <Checkbox key={item.value} value={item.value}>
                            {item.label}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            );
        case 'muilt-input':
            return (
                <MuiltInput
                    placeholder={placeholder ?? t('common:placeholder.input', { name: label })}
                    {...otherProps}
                />
            );

        case 'size-input':
            return (
                <SizeInput
                    t={t}
                    allowClear
                    {...otherProps}
                    {...{ addon_key, addonOptions }}
                    name={item.key}
                    placeholder={placeholder ?? t('common:placeholder.input', { name: label })}
                />
            );

        case 'compact-input':
            return (
                <CompactInput
                    isRequired={isRequired}
                    {...otherProps}
                    {...{
                        addon_key,
                        addonOptions,
                        label,
                    }}
                    name={item.key}
                    placeholder={placeholder ?? t('common:placeholder.input', { name: label })}
                />
            );
        default:
            if (isSeniorForm && multiple) {
                return (
                    <Input.TextArea
                        allowClear
                        placeholder={placeholder ?? t('common:placeholder.input', { name: label })}
                        {...otherProps}
                    />
                );
            }
            return (
                <Input
                    allowClear
                    placeholder={placeholder ?? t('common:placeholder.input', { name: label })}
                    {...otherProps}
                />
            );
    }
};
