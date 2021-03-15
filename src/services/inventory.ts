import { useRequest, get, post, del } from '@gui/request';
export const ApiInventory = {
    exportUrl: '/api/inventory/export/',
    warehouseSumExportUrl: '/api/inventorysummary/warehouse/export/',
    accountSumexportUrl: '/api/inventorysummary/account/export/',
    runreportTemplateUrl: '/api/runreport/template/',
    /**
     * List Inventory 列表
     */
    List(options?) {
        return useRequest('/api/inventory/', options);
    },

    /**
     * Inventory Summary
     */
    Summary(options?) {
        return useRequest('/api/inventory/summary/', options);
    },

    /**
     * List Warehouse Inventory Summary 列表
     */
    WarehouseSummary(options?) {
        return useRequest('/api/inventorysummary/warehouse/', options);
    },

    /**
     * List Account Inventory Summary 列表
     */
    AccountSummary(options?) {
        return useRequest('/api/inventorysummary/account/', options);
    },

    /**
     * Detail Inventory 详情
     */
    Detail({ id }) {
        return get(`/api/inventory/${id}/`);
    },

    /**
     * RunReport 创建
     */
    Update(options) {
        return post(`/api/runreport/`, options);
    },
    BatchUpdate(options) {
        return post(`/api/runreport/import/`, options);
    },

    /**
     *  RunReport 列表
     */
    RecordList(options) {
        return useRequest(`/api/runreport/`, options);
    },

    /**
     *  Batch 列表
     */
    BatchList(options) {
        return useRequest(`/api/inventorybatch/`, options);
    },

    /**
     *  BatchFeeList 列表
     */
    BatchFeeList(options) {
        return useRequest(`/api/inventorybatchfee/`, options);
    },
    BatchFeeListByWarehouse(options) {
        return useRequest(`/api/inventorybatchfee/statistics/warehouse/`, options);
    },
    ExportBatchFeeListByWarehouse() {
        return `/api/inventorybatchfee/statistics/warehouse/export/`;
    },
    BatchFeeListBySku(options) {
        return useRequest(`/api/inventorybatchfee/statistics/sku/`, options);
    },
    ExportBatchFeeListBySku() {
        return `/api/inventorybatchfee/statistics/sku/export/`;
    },
    BatchFeeListByAccount(options) {
        return useRequest(`/api/inventorybatchfee/statistics/account/`, options);
    },
    ExportBatchFeeListByAccount() {
        return `/api/inventorybatchfee/statistics/account/export/`;
    },

    /**
     *  BatchFee汇总
     */
    BatchFeeStat(options) {
        return useRequest(`/api/inventorybatchfee/statistics/`, options);
    },

    /**
     * RevokeUpdate
     */
    RevokeUpdate(id) {
        return del(`/api/runreport/${id}/`, {});
    },
};
