import { useState } from 'react';
import { Button, Row, Col, Upload } from 'antd';
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';

interface DetailPanelProps {
    t;
    fileTypes;
    datas;
    delFn?;
    updateRender?;
    uploadRender?;
}

export const FileItemsDetailPanel = ({
    t,
    fileTypes,
    datas,
    delFn,
    updateRender,
    uploadRender,
}: DetailPanelProps) => {
    return (
        <Row>
            {fileTypes?.map((i) => (
                <Col
                    key={i.key}
                    span={24 / (fileTypes?.length || 1)}
                    className="t-center d-flex flex-col file-items"
                >
                    <span className="title">
                        {i.label}
                        {!!datas?.[i.key]?.length && updateRender}
                    </span>
                    {datas?.[i.key]?.length
                        ? datas?.[i.key]?.map((item) => (
                              <FileItem
                                  t={t}
                                  key={item.id}
                                  name={t('common:file-name', { name: i.label })}
                                  file={item}
                                  delFn={delFn && !i.notDel && ((file) => delFn(file, i.type))}
                              />
                          ))
                        : uploadRender}
                </Col>
            ))}

            <style jsx>{`
                :global(.file-items .title) {
                    margin: 1em auto;
                    font-weight 700;
                    coloe: #666;
                }
                :global(.file-items) {
                    max-height: 18em;
                    overflow-y: auto;
                }
                :global(.file-items:not(:last-child)) {
                    border-right: 1px solid #ddd;
                }
            `}</style>
        </Row>
    );
};

interface UploadItemProps {
    t;
    onChange?;
    max?: number;
    name: string;
    accept?;
}

export const UploadFormItem = ({ t, onChange, max, name, accept }: UploadItemProps) => {
    const [fileList, setFileList] = useState<any>([]);

    const iprops = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
        name,
        accept: accept ?? '.xls, .pdf, .xlsx, .csv, .jpg, .jpeg, .png',
    };
    return (
        <div className="d-flex">
            <Upload
                className="upload-wrapper"
                {...iprops}
                onChange={({ file, fileList }) => {
                    console.log(file, fileList);
                    if (!fileList?.length) {
                        onChange([]);
                    } else {
                        onChange([...fileList.slice(0, -1), file]);
                    }
                }}
            >
                <Button disabled={max && fileList?.length >= max} icon={<UploadOutlined />}>
                    {t('common:selectFile')}
                </Button>
            </Upload>

            <style jsx>{`
                :global(.upload-wrapper) {
                    display: flex;
                    flex-flow: row wrap;
                    margin-right: 1.5em;
                    padding: 0.2em 0;
                    width: 100%;
                }
                :global(.upload-wrapper .ant-upload-list) {
                    position: realtive;
                    top: -8px;
                    margin-left: 1em;
                    color: #999;
                    line-height: 1em;
                }
                :global(.upload-wrapper .ant-upload-list .ant-upload-list-item) {
                    margin: 0;
                    padding: 0.2em 0;
                    height: auto;
                    line-height: 1.5em;
                }
            `}</style>
        </div>
    );
};

interface FileItemProps {
    t;
    name;
    file;
    delFn?;
    viewFn?;
    inline?;
    isDetail?;
}
export default function FileItem({
    t,
    name,
    file,
    delFn,
    inline,
    isDetail,
    viewFn,
}: FileItemProps) {
    if (inline) {
        return (
            <div className="item">
                {file.file ? (
                    <a href={file.file} target="_blank" rel="noreferrer">
                        {file.filename || name + '文件'}
                    </a>
                ) : (
                    <span className="c-disable">{file.filename || name + '文件'}</span>
                )}

                <span className="c-disable time">
                    {t('common:upload_at')}: {file.created}
                </span>

                {!isDetail && (
                    <>
                        {file?.file && (
                            <Button
                                className="ml-2 p-0"
                                icon={<DownloadOutlined className="fz-s" />}
                                type="link"
                                size="small"
                                href={file?.file}
                            />
                        )}
                        {!!delFn && (
                            <Button
                                className="ml-2 p-0"
                                icon={<DeleteOutlined className="fz-s" />}
                                type="link"
                                size="small"
                                danger
                                onClick={() => delFn(file)}
                            />
                        )}
                    </>
                )}
                {!!viewFn && (
                    <Button className="ml-2" type="link" size="small" onClick={() => viewFn(file)}>
                        {t('common:view_detail')}
                    </Button>
                )}
                <style jsx>{`
                    .time {
                        margin: 0 1em;
                    }
                `}</style>
            </div>
        );
    }
    return (
        <div className="item">
            {file.file ? (
                <a href={file.file} target="_blank" rel="noreferrer">
                    {file.filename || name}
                </a>
            ) : (
                <span className="c-disable">{file.filename || name}</span>
            )}

            {delFn && (
                <Button
                    className="ml-2 p-0"
                    icon={<DeleteOutlined className="fz-s" />}
                    type="link"
                    size="small"
                    danger
                    onClick={() => delFn(file)}
                ></Button>
            )}
            <br />
            <span className="c-disable">{file.created}</span>
            <style jsx>{`
                .item {
                    margin-bottom: 1em;
                }
            `}</style>
        </div>
    );
}
