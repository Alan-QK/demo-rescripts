import { columns as ProductColumnsFn } from '@components/product/confs';
import { columns as InventoryColumnsFn } from '@components/inventory/confs';
import { columns as OrderColumnsFn } from '@components/order/confs';
import {
    columns as InboundNoticeColumnsFn,
    containerColumns as containerColumnsFn,
    palletColumns as palletColumnsFn,
    cartonColumns as cartonColumnsFn,
    eachColumns as eachColumnsFn,
} from '@components/inboundNotice/confs';
import {
    columns as InboundColumnsFn,
    TallyReportColumns as TallyReportColumnsFn,
} from '@components/inbound/confs';
import {
    OutboundColumns as OutboundColumnsFn,
    OutboundScanColumns as OutboundScanColumnsFn,
} from '@components/outbound/confs';
import { ListColumns as WarehouseColumnsFn } from '@components/warehouse/confs';
import { userColumns as userColumnsFn } from '@components/account/confs';

export function transColumns(t, colunms) {
    return colunms(t)?.map((i) => ({ label: i.title, value: i.dataIndex }));
}

export const Product = (t) => transColumns(t, ProductColumnsFn);
export const Inventory = (t) => transColumns(t, InventoryColumnsFn);
export const Order = (t) => transColumns(t, OrderColumnsFn);
export const InboundNotice = (t) => transColumns(t, InboundNoticeColumnsFn);
export const container = (t) => transColumns(t, containerColumnsFn);
export const pallet = (t) => transColumns(t, palletColumnsFn);
export const carton = (t) => transColumns(t, cartonColumnsFn);
export const each = (t) => transColumns(t, eachColumnsFn);
export const Inbound = (t) => transColumns(t, InboundColumnsFn);
export const TallyReport = (t) => transColumns(t, TallyReportColumnsFn);
export const Outbound = (t) => transColumns(t, OutboundColumnsFn);
export const OutboundScan = (t) => transColumns(t, OutboundScanColumnsFn);
export const Warehouse = (t) => transColumns(t, WarehouseColumnsFn);
export const User = (t) => transColumns(t, userColumnsFn);
