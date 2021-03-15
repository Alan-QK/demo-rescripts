import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Button } from 'antd';
import { SmileOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import AysncTable from '@components/common/AysncTable';
import Panel from '@components/home/Panel';

import { ApiWarehouse } from '@services/warehouse';
import { ApiContainer } from '@services/inboundNotice';
import { AccessAuth } from 'utils/usePermission';
import WarehouseRenderFn from '@components/warehouse/RenderFn';

const WarehouseColumns = (t) => [
    { title: t('warehouse.name'), dataIndex: 'name' },
    { title: t('warehouse.code'), dataIndex: 'code' },
    { title: t('warehouse.type'), dataIndex: 'typ' },
    { title: t('warehouse.capacity_type'), dataIndex: 'capacity_type' },
];

const ContainerColumns = (t) => [
    { title: t('container.code'), dataIndex: 'code' },
    { title: t('container.typ'), dataIndex: 'typ' },
    { title: t('container.status'), dataIndex: 'status' },
    { title: t('container.warehouse'), dataIndex: 'warehouse' },
    { title: t('container.inbound_at'), dataIndex: 'inbound_at' },
    { title: t('container.emptied_at'), dataIndex: 'emptied_at' },
    { title: t('container.scheduled_picked_up_at'), dataIndex: 'scheduled_picked_up_at' },
];
export const WarehouseSection = ({ t }) => {
    const [datas, setDatas] = useState([]);
    const tableRef: any = useRef();
    const updateTableFn = () => {
        setDatas(tableRef?.current?.getTableData()?.dataSource);
    };
    return (
        <Panel title={t('panel.title.warehouse')} href="/warehouse" t={t}>
            <p
                className="tip"
                dangerouslySetInnerHTML={{
                    __html: t('panel.tip.warehouse', { num: datas?.length ?? 0 }),
                }}
            ></p>
            <AysncTable
                myRef={tableRef}
                apiUrl={ApiWarehouse.AsyncList}
                callbackFn={updateTableFn}
                listName=""
                confs={{
                    hidePagination: true,
                    bordered: true,
                    size: 'small',
                    columns: WarehouseColumns(t).map((i) => ({
                        ...i,
                        render: WarehouseRenderFn(t)?.[i.dataIndex] || ((v) => v),
                    })),
                    scroll: { y: 250 },
                }}
            />
            <style jsx>{`
                .tip {
                    margin-bottom: 1em;
                    font-size: 0.8em;
                    font-weight: 700;
                    color: #666;
                }
                .tip > span {
                    font-size: 1.5em;
                }
            `}</style>
        </Panel>
    );
};

export const PackageSection = ({ t }) => {
    const [datas, setDatas] = useState([]);
    const tableRef: any = useRef();
    const updateTableFn = () => {
        setDatas(tableRef?.current?.getTableData()?.dataSource);
    };
    return (
        <Panel title={t('panel.title.container')} href="/inboundNotice/container" t={t}>
            <p
                className="tip"
                dangerouslySetInnerHTML={{
                    __html: t('panel.tip.container', { num: datas?.length ?? 0 }),
                }}
            ></p>
            <AysncTable
                myRef={tableRef}
                apiUrl={ApiContainer.List}
                callbackFn={updateTableFn}
                confs={{
                    hidePagination: true,
                    bordered: true,
                    size: 'small',
                    columns: ContainerColumns(t),
                    scroll: { y: 250 },
                }}
            />
            <style jsx>{`
                .tip {
                    margin-bottom: 1em;
                    font-size: 0.8em;
                    font-weight: 700;
                    color: #666;
                }
                .tip > span {
                    font-size: 1.5em;
                }
            `}</style>
        </Panel>
    );
};

export const OrderSection = ({ t }) => {
    return <Panel title={t('panel.title.order')} href="/order" t={t}></Panel>;
};

export const Collection = ({ t }) => {
    const childs = [
        AccessAuth('action', 'warehouse.add', ['warehouse', 'warehouse.list']) && (
            <Link to={`/warehouse/add`} key="warehouse.add">
                <span>
                    <Button icon={<PlusOutlined />}>{t('shortcuts.warehouseAdd')}</Button>
                </span>
            </Link>
        ),
        AccessAuth('action', 'product.add', ['product', 'product.list']) && (
            <Link to="/product/add" key="product.add">
                <span>
                    <Button icon={<PlusOutlined />}>{t('shortcuts.productAdd')}</Button>
                </span>
            </Link>
        ),
        AccessAuth('action', 'inbound_notice.add', ['inboundNotice', 'inbound_notice.list']) && (
            <Link to="/inboundNotice/add" key="inbound_notice.add">
                <span>
                    <Button icon={<PlusOutlined />}>{t('shortcuts.inbound_noticeAdd')}</Button>
                </span>
            </Link>
        ),
        AccessAuth('action', 'inbound.add', ['inbound', 'inbound.list']) && (
            <Link to="/inbound/add" key="inbound.add">
                <span>
                    <Button icon={<PlusOutlined />}>{t('shortcuts.inboundAdd')}</Button>
                </span>
            </Link>
        ),
        AccessAuth('action', 'order.add', ['order', 'order.list']) && (
            <Link to="/order/add" key="order.add">
                <span>
                    <Button icon={<ImportOutlined />}>{t('shortcuts.orderAdd')}</Button>
                </span>
            </Link>
        ),
        AccessAuth('action', 'outbound.add', ['outbound', 'outbound.list']) && (
            <Link to="/outbound/add" key="outbound.add">
                <span>
                    <Button icon={<PlusOutlined />}>{t('shortcuts.outboundAdd')}</Button>
                </span>
            </Link>
        ),
    ].filter((i) => i);

    if (!childs?.length) return null;

    return (
        <Row className="btn-group">
            <Col>
                <b className="c-success">
                    <SmileOutlined className="mr-2 c-success" /> {t('shortcuts.title')}{' '}
                </b>
            </Col>
            {childs?.map((i, idx) => (
                <Col key={idx}>{i}</Col>
            ))}

            <style jsx>{`
                :global(.btn-group .ant-col) {
                    padding: 0 0.5em;
                    margin-bottom: 0.5em;
                }
                :global(.btn-group .ant-btn) {
                    padding: 0.2em 1em;
                    height: auto;
                    font-size: 0.8em;
                    border-radius: 0;
                    background: #bfbfbf;
                }
            `}</style>
        </Row>
    );
};
