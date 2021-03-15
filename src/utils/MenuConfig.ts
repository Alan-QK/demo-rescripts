import * as Columns from './permissionItems/columns';
import * as Actions from './permissionItems/actions';

const Menus = [
    {
        label: 'product',
        key: 'product',
        href: '/product',
        i18n: 'i18n_product',
        subAgent: 'product.list',
        subMenus: [
            {
                label: 'subs_product.list',
                key: 'product.list',
                href: '/product',
                confs: {
                    columns: Columns.Product,
                    actions: Actions.Product,
                },
            },
            {
                label: 'subs_product.add',
                key: 'product.add',
                href: '/product/add',
                isNotSetting: true,
            },
            {
                label: 'subs_product.edit',
                key: 'product.edit',
                href: '/product/edit/[id]',
                isShowCurrent: true,
            },
            {
                label: 'subs_product.detail',
                key: 'product.detail',
                href: '/product/detail/[id]',
                isShowCurrent: true,
            },
        ],
    },
    {
        label: 'inbound_notice.mgr',
        key: 'inboundNotice',
        href: '/inboundNotice',
        i18n: 'i18n_inbound_notice',
        subAgent: 'inbound_notice.list',
        subMenus: [
            {
                label: 'inbound_notice.list',
                key: 'inbound_notice.list',
                href: '/inboundNotice',
                confs: {
                    columns: Columns.InboundNotice,
                    actions: Actions.InboundNotice,
                },
            },
            {
                label: 'inbound_notice.add',
                key: 'inbound_notice.add',
                href: '/inboundNotice/add',
                isShowCurrent: true,
            },
            {
                label: 'inbound_notice.container',
                key: 'inbound_notice.asn',
                href: '/inboundNotice/container',
                confs: {
                    columns: Columns.container,
                    actions: Actions.Container,
                },
            },
            {
                label: 'inbound_notice.pallet',
                key: 'inbound_notice.pallet',
                href: '/inboundNotice/pallet',
                confs: {
                    columns: Columns.pallet,
                    actions: () => [],
                },
            },
            {
                label: 'inbound_notice.pallet_detail',
                key: 'inbound_notice.pallet.detail',
                href: '/inboundNotice/pallet/[id]',
                isShowCurrent: true,
            },
            {
                label: 'inbound_notice.carton',
                key: 'inbound_notice.carton',
                href: '/inboundNotice/carton',
                confs: {
                    columns: Columns.carton,
                    actions: () => [],
                },
            },
            {
                label: 'inbound_notice.carton_detail',
                key: 'inbound_notice.carton.detail',
                href: '/inboundNotice/carton/[id]',
                isShowCurrent: true,
            },
            {
                label: 'inbound_notice.sku',
                key: 'inbound_notice.sku',
                href: '/inboundNotice/sku',
                confs: {
                    columns: Columns.each,
                    actions: () => [],
                },
            },
            {
                label: 'inbound_notice.sku_detail',
                key: 'inbound_notice.sku.detail',
                href: '/inboundNotice/sku/[id]',
                isShowCurrent: true,
            },
        ],
    },
    {
        label: 'inbound.title',
        key: 'inbound',
        href: '/inbound',
        i18n: 'i18n_inbound',
        subAgent: 'inbound.list',
        subMenus: [
            {
                label: 'inbound.list',
                key: 'inbound.list',
                href: '/inbound',
                confs: {
                    columns: Columns.Inbound,
                    actions: Actions.Inbound,
                },
            },
            {
                label: 'inbound.edit',
                key: 'inbound.edit',
                href: '/inbound/edit/[id]',
                isShowCurrent: true,
            },
            {
                label: 'inbound.detail',
                key: 'inbound.detail',
                href: '/inbound/detail/[id]',
                isShowCurrent: true,
            },
            {
                label: 'tally_report.list',
                key: 'inbound.tally_report.list',
                href: '/inbound/tally_report',
                confs: {
                    columns: Columns.TallyReport,
                    actions: Actions.TallyReport,
                },
            },
            {
                label: 'tally_report.detail',
                key: 'inbound.tally_report.detail',
                href: '/inbound/tally_report/[id]',
                isShowCurrent: true,
            },
            {
                label: 'inbound.add',
                key: 'inbound.add',
                href: '/inbound/add',
                isNotSetting: true,
            },
        ],
    },
    {
        label: 'inventory.title',
        key: 'inventory',
        href: '/inventory',
        i18n: 'i18n_inventory',
        subAgent: 'inventory.list',
        subMenus: [
            {
                label: 'inventory.list',
                key: 'inventory.list',
                href: '/inventory',
                confs: {
                    columns: Columns.Inventory,
                    actions: Actions.Inventory,
                },
            },
            {
                label: 'inventory.update',
                key: 'runreport.list',
                href: '/inventory/update',
                confs: {
                    actions: Actions.RunReport,
                },
            },
            {
                label: 'inventory.detail',
                key: 'inventory.detail',
                href: '/inventory/[id]',
                isShowCurrent: true,
            },
            {
                label: 'inventory.summary.warehouse',
                key: 'inventory.summary.warehouse',
                href: '/inventory/summary.warehouse',
            },
            {
                label: 'inventory.summary.account',
                key: 'inventory.summary.account',
                href: '/inventory/summary.account',
            },
            {
                label: 'inventory.batch',
                key: 'inventory.batch',
                href: '/inventory/batch',
            },
            ,
            {
                label: 'inventory.batch_fee',
                key: 'inventory.batch_fee',
                href: '/inventory/batch_fee',
            },
        ],
    },
    {
        label: 'order.title',
        key: 'order',
        href: '/order',
        i18n: 'i18n_order',
        subAgent: 'order.list',
        subMenus: [
            {
                label: 'order.list',
                key: 'order.list',
                href: '/order',
                confs: {
                    columns: Columns.Order,
                    actions: Actions.Order,
                },
            },
            {
                label: 'order.add',
                key: 'order.add',
                href: '/order/add',
                isNotSetting: true,
            },
            {
                label: 'order.detail',
                key: 'order.detail',
                href: '/order/detail/[id]',
                isShowCurrent: true,
            },
        ],
    },
    {
        label: 'outbound.title',
        key: 'outbound',
        href: '/outbound',
        i18n: 'i18n_outbound',
        subAgent: 'outbound.list',
        subMenus: [
            {
                label: 'outbound.record',
                key: 'outbound.list',
                href: '/outbound',
                confs: {
                    columns: Columns.Outbound,
                    actions: Actions.Outbound,
                },
            },
            {
                label: 'outbound.add',
                key: 'outbound.add',
                href: '/outbound/add',
                isNotSetting: true,
                // isShowCurrent: true,
            },
            {
                label: 'outbound.edit',
                key: 'outbound.edit',
                href: '/outbound/edit/[id]',
                isShowCurrent: true,
            },
            {
                label: 'outbound.detail',
                key: 'outbound.detail',
                href: '/outbound/detail/[id]',
                isShowCurrent: true,
            },
            {
                label: 'outbound.scan',
                key: 'outbound.scan',
                href: '/outbound/scan',
                confs: {
                    columns: Columns.OutboundScan,
                    actions: Actions.Scan,
                },
            },
        ],
    },
    {
        label: 'warehouse',
        key: 'warehouse',
        href: '/warehouse',
        i18n: 'i18n_warehouse',
        subAgent: 'warehouse.list',
        subMenus: [
            {
                label: 'subs_warehouse.list',
                key: 'warehouse.list',
                href: '/warehouse',
                confs: {
                    columns: Columns.Warehouse,
                    actions: Actions.Warehouse,
                },
            },
            {
                label: 'subs_warehouse.add',
                key: 'warehouse.add',
                href: '/warehouse/add',
                isShowCurrent: true,
            },
            {
                label: 'subs_warehouse.edit',
                key: 'warehouse.edit',
                href: '/warehouse/edit/[id]',
                isShowCurrent: true,
            },
            {
                label: 'subs_warehouse.detail',
                key: 'warehouse.detail',
                href: '/warehouse/detail/[id]',
                isShowCurrent: true,
            },
        ],
    },
    {
        label: 'report.title',
        key: 'report',
        href: '/report',
        i18n: 'i18n_report',
        subMenus: [
            {
                label: 'report.daily',
                key: 'report.daily',
                href: '/report',
            },
            {
                label: 'report.daily_detail',
                key: 'report.daily.detail',
                href: '/report/[id]',
                isShowCurrent: true,
                isNotSetting: true,
            },
        ],
    },
];

const otherMenus = [
    {
        label: 'account',
        key: 'account',
        href: '/account',
        i18n: 'i18n_account',
        subAgent: 'account.list',
        subMenus: [
            {
                label: 'sub_account.list',
                key: 'account.list',
                href: '/account',
                confs: {
                    columns: Columns.User,
                    actions: Actions.user,
                },
            },
            {
                label: 'sub_account.detail',
                key: 'account.detail',
                href: '/account/detail/[id]',
                isShowCurrent: true,
            },
            {
                label: 'sub_account.add',
                key: 'account.add',
                href: '/account/add',
                isShowCurrent: true,
            },
            {
                label: 'sub_account.edit',
                key: 'account.edit',
                href: '/account/edit/[id]',
                isShowCurrent: true,
            },
            {
                label: 'sub_account.template.title',
                key: 'account.template',
                href: '/account/templates',
                isNotSetting: true,
            },
            {
                label: 'sub_account.template.add',
                key: 'account.template.add',
                href: '/account/templates/add',
                isShowCurrent: true,
                isNotSetting: true,
            },
            {
                label: 'sub_account.template.edit',
                key: 'account.template.edit',
                href: '/account/templates/edit',
                isShowCurrent: true,
                isNotSetting: true,
            },
        ],
    },
];

export const SettingsMenus = [
    {
        label: 'events.label',
        key: 'events',
        i18n: 'i18n_events',
        href: '/events-setting',
        isNotSetting: true,
        subMenus: [
            {
                label: 'events.receiver',
                key: 'events.receiver',
                href: '/events-setting',
                isNotSetting: true,
            },
            {
                label: 'events.logs',
                key: 'events.logs',
                href: '/events-setting/logs',
                isNotSetting: true,
            },
        ],
    },
    {
        label: 'rate.label',
        key: 'rate',
        href: '/rate',
        i18n: 'i18n_rate',
        isNotSetting: true,
        subAgent: 'rate.list',
        subMenus: [
            {
                label: 'rate.list',
                key: 'rate.list',
                href: '/rate',
                isNotSetting: true,
            },
            {
                label: 'rate.create',
                key: 'rate.create',
                href: '/rate/create',
                isShowCurrent: true,
                isNotSetting: true,
            },
            {
                label: 'rate.detail',
                key: 'rate.detail',
                href: '/rate/[id]',
                isShowCurrent: true,
                isNotSetting: true,
            },
        ],
    },
];

export const AllMenus: any = [...Menus, ...otherMenus, ...SettingsMenus];

export default Menus;
