import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
export default function ViewDetailBtn({ t, callbackFn, recordId, txt = '' }) {
    const [expandedRowKeys, setExpandedRowKeys] = useState<Array<any>>([]);
    const expandRow = () => {
        const idx = expandedRowKeys?.findIndex((i) => recordId === i);
        if (idx === -1) {
            setExpandedRowKeys([...expandedRowKeys, recordId]);
        } else {
            const nextExpandKeys = expandedRowKeys.slice();
            nextExpandKeys.splice(idx, 1);
            setExpandedRowKeys(nextExpandKeys);
        }
    };

    useEffect(() => {
        callbackFn(expandedRowKeys);
    }, [expandedRowKeys]);

    return (
        <Button type="link" className="fz-s p-0" onClick={() => expandRow()}>
            {txt || t('common:view_detail')}
            <CaretUpOutlined
                className="ml-3"
                rotate={expandedRowKeys.includes(recordId) ? 0 : 180}
            />
        </Button>
    );
}
