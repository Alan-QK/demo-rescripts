import { useState, useEffect } from 'react';
import { Popover, Button, Checkbox } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { withTranslation } from '@i18n';
import isArray from 'lodash/isArray';

const CheckboxGroup = Checkbox.Group;

const TableCoumnFilterBtn = ({ t, uniqueId, columns, callbackFn }: any) => {
    const [selectedColumns, setSelectedColumns] = useState<any>([]);
    const [isCheckAll, setisCheckAll] = useState(true);
    if (!uniqueId) return null;
    const options = columns.reduce((arr, i) => {
        return [
            ...arr,
            {
                ...i,
                label: i.title,
                value: isArray(i.dataIndex) ? i.dataIndex.join('.') : i.dataIndex,
                disabled: i.forbidden,
            },
        ];
    }, []);

    const onChange = (afterColumns) => {
        setSelectedColumns(afterColumns);
        callbackFn(afterColumns);
        localStorage.setItem(uniqueId, JSON.stringify(afterColumns || []));
    };
    const onCheckAllChange = ({ target }) => {
        setisCheckAll(target.checked);
        const cols = target.checked
            ? options.map((item) => item.dataIndex)
            : options.filter((item) => item.forbidden).map((item) => item.dataIndex);
        onChange(cols);
    };

    useEffect(() => {
        const cacheColumnsOptions = localStorage.getItem(uniqueId);
        const cols =
            cacheColumnsOptions && cacheColumnsOptions !== '[]'
                ? JSON.parse(cacheColumnsOptions)
                : columns.map((i) => i.dataIndex);

        onChange(cols);
    }, []);

    return (
        <>
            <Popover
                placement="bottom"
                trigger="click"
                title={
                    <>
                        <span style={{ fontWeight: 'bold' }}>{t('custom-table-columns')}</span>
                        <Checkbox
                            style={{ marginLeft: 16, fontSize: '12px' }}
                            onChange={onCheckAllChange}
                            checked={isCheckAll}
                            indeterminate={
                                selectedColumns?.length &&
                                selectedColumns?.length !== columns?.length
                            }
                        >
                            {t('select-all')}
                        </Checkbox>
                    </>
                }
                content={
                    <CheckboxGroup
                        className="custom-table-column-filter-btn"
                        style={{ maxWidth: 350 }}
                        options={options}
                        value={selectedColumns}
                        onChange={onChange}
                    />
                }
            >
                <Button className="setting-btn" icon={<SettingOutlined />} />
            </Popover>

            <style jsx>{`
                :global(.custom-table-column-filter-btn .ant-checkbox-group-item) {
                    width: calc(33% - 8px);
                    white-space: nowrap;
                    margin-bottom: 1em;
                }
            `}</style>
        </>
    );
};

export default withTranslation('common')(TableCoumnFilterBtn);
