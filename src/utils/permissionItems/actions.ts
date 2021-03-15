import { Actions as ProductActionsFn } from '@components/product/confs';

import {
    Actions as InventoryActionsFn,
    RunReportActions as RunReportActionsFn,
} from '@components/inventory/confs';
import { Actions as OrderActionsFn } from '@components/order/confs';
import {
    InboundNoticeActions as InboundNoticeActionsFn,
    ContainerActions as ContainerActionsFn,
} from '@components/inboundNotice/confs';
import {
    InboundActions as InboundActionsFn,
    TallyReportActions as TallyReportActionsFn,
} from '@components/inbound/confs';
import {
    OutboundActions as OutboundActionsFn,
    ScanActions as ScanActionsFn,
} from '@components/outbound/confs';
import { WarehouseActions as WarehouseActionsFn } from '@components/warehouse/confs';
import { Actions as userActionsFn } from '@components/account/confs';

export const Product = (t) => ProductActionsFn(t);
export const Inventory = () => InventoryActionsFn();
export const RunReport = (t) => RunReportActionsFn(t);
export const Order = (t) => OrderActionsFn(t);
export const InboundNotice = (t) => InboundNoticeActionsFn(t);
export const Container = (t) => ContainerActionsFn(t);
export const Inbound = (t) => InboundActionsFn(t);
export const TallyReport = (t) => TallyReportActionsFn(t);
export const Outbound = (t) => OutboundActionsFn(t);
export const Scan = (t) => ScanActionsFn(t);
export const Warehouse = (t) => WarehouseActionsFn(t);
export const user = (t) => userActionsFn(t);
