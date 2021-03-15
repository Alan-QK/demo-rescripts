import { useState } from 'react';
import { Form, Table, InputNumber, Input } from 'antd';

export default function EditableTable({
    dataSource,
    columns,
    rowKey,
    // actions,
    pagination,
    ...props
}) {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record[rowKey] === editingKey;
    const cancel = () => {
        setEditingKey('');
    };

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                columns={mergedColumns(columns, isEditing)}
                dataSource={dataSource}
                {...props}
                pagination={
                    pagination
                        ? {
                              ...pagination,
                              onChange: cancel,
                          }
                        : false
                }
            />
        </Form>
    );
}

export const mergedColumns = (columns, isEditing) =>
    columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing?.(record),
            }),
        };
    });

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: any;
    index: number;
    children: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    inputType,
    children,
    ...restProps
}) => {
    const inputNode =
        inputType === 'number' ? (
            <InputNumber size="small" />
        ) : (
            <Input size="small" className="fz-s" style={{ width: 120 }} />
        );

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0 }}>
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
