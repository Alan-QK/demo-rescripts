import { Table } from 'antd';

export default function ErrorResponseTable({ error }) {
    const dataSource = error?.response?.data?.data.map((item) => {
        if (typeof item === 'string') {
            return { context: '', data: '', errors: item };
        } else {
            return item;
        }
    });
    const renderFn = (text: any) => {
        return text && JSON.stringify(text, null, 2);
    };
    const columns = [
        {
            title: 'context',
            dataIndex: 'context',
            key: 'context',
            render: renderFn,
        },
        {
            title: 'data',
            dataIndex: 'data',
            key: 'data',
            render: renderFn,
        },
        {
            title: 'errors',
            dataIndex: 'errors',
            key: 'errors',
            render: renderFn,
        },
    ];

    return <Table dataSource={dataSource} columns={columns} />;
}
