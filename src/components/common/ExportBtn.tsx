import { useState, useEffect } from 'react';
import { post } from '@gui/request';
import { Button, Modal, Tooltip, Radio, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';

interface Props {
    title?;
    path;
    paramsByKeys?;
    paramsBySearch?;
    params?;
}

export default function ExportBtn({ title, path, paramsByKeys, paramsBySearch, params }: Props) {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<'A' | 'S' | 'O'>('A');
    const [ableOnly, setAbleOnly] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            const vals = Object.values(paramsByKeys)?.[0];
            if (!vals || isEmpty(vals)) {
                setAbleOnly(true);
            } else {
                setType('O');
            }
        }
    }, [visible, paramsByKeys]);

    const onSubmit = async (defaultVals?) => {
        setLoading(true);
        const params =
            defaultVals ||
            Object.assign(type === 'A' ? {} : type === 'S' ? paramsBySearch : paramsByKeys, {
                timezone_offset: new Date().getTimezoneOffset(),
            });

        const formData = new FormData();
        console.log(params);
        Object.keys(params).forEach((k) => {
            formData.append(k, params[k]);
        });

        try {
            // @ts-ignore
            const res: any = await post(path, formData, { responseType: 'blob' });
            const data = res.data;
            const content_disposition = res.headers['content-disposition'];
            let filename = 'file';
            if (content_disposition.indexOf('filename') > -1) {
                filename = content_disposition.split('=')[1].trim();
                filename = decodeURI(escape(filename));
            }
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            setVisible(false);
        } catch (error) {
            message.error(error?.response?.data?.msg);
        }
        setLoading(false);
    };
    const onExport = () => {
        if (params) {
            onSubmit(params);
            return;
        }
        setVisible(true);
    };
    return (
        <>
            <Modal
                title={title || `??????????????????`}
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={() => onSubmit()}
                confirmLoading={loading}
                afterClose={() => {
                    setType('A');
                    setAbleOnly(false);
                }}
            >
                <Radio.Group
                    className="d-flex flex-col"
                    value={type}
                    onChange={({ target }) => setType(target.value)}
                >
                    <Radio className="mb-3" value="A">
                        ??????????????????
                    </Radio>
                    <Radio className="mb-3" value="S">
                        ?????????????????????
                    </Radio>
                    <Radio value="O" disabled={ableOnly}>
                        ??????????????????
                    </Radio>
                </Radio.Group>
            </Modal>
            <Tooltip title="??????" placement="top">
                <Button
                    loading={!!params && loading}
                    icon={<DownloadOutlined />}
                    onClick={onExport}
                ></Button>
            </Tooltip>
        </>
    );
}
