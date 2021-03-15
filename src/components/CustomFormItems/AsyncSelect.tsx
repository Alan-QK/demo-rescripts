import { useState, useEffect } from 'react';
import { Select } from 'antd';

export default function AsyncSelect(props) {
    const { apiUrl, params, itemKeys, disabled, loading, ...otherProps } = props;

    const [fetching, setLoading] = useState(false);
    const [datas, setDatas] = useState<Array<any>>();
    const [labelKey = 'label', uniqueKey = 'value', valueKey = 'value'] = itemKeys;

    useEffect(() => {
        setLoading(true);
        apiUrl(params).then((res) => {
            setDatas(res);
            setLoading(false);
        });
    }, [params]);

    return (
        <Select
            {...otherProps}
            loading={loading || fetching}
            disabled={loading || disabled}
            optionLabelProp="label"
        >
            {datas?.map((i) => (
                <Select.Option
                    key={i[uniqueKey]}
                    value={i[valueKey] || i[uniqueKey]}
                    label={i[labelKey]}
                >
                    {i[labelKey]}
                </Select.Option>
            ))}
        </Select>
    );
}
