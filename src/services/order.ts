import { useRequest, post, get } from '@gui/request';
export const ApiOrder = {
    templateUrl: '/api/order/template/',
    trackingCodeTemplateUrl: '/api/order/template_tracking_code/',
    exportUrl: '/api/order/export/',
    zipUrl: '/api/order/zip/',

    /**
     * List order 列表
     */
    List(options?) {
        return useRequest('/api/order/list/', options);
    },

    /**
     * Add Order 订单创建
     */
    Add(options) {
        return post(`/api/order/`, options);
    },

    /**
     * Export 订单导出
     */
    Export(options) {
        return post(`/api/order/export/`, options);
    },

    /**
     * Import 订单导入
     */
    Import(options) {
        return post(`/api/order/import/`, options);
    },
    ImportByTrackCode(options) {
        return post(`/api/order/import_tracking_code/`, options);
    },

    /**
     * Split 订单分拆
     */
    Split({ id, ...options }) {
        return post(`/api/order/${id}/split/`, options);
    },

    /**
     * Detail 订单详情
     */
    Detail({ id }) {
        return get(`/api/order/${id}/`);
    },

    /**
     *  打印面单
     */
    ZipLabel(options) {
        return post(`/api/order/zip/`, options);
    },

    /**
     *  下单
     */
    PlaceOrder(options) {
        return post(`/api/order/confirm/`, options);
    },

    /**
     * 上传ACT订单到FTP
     */

    ActFtpShipping(options = {}) {
        return post(`/api/order/act_ftp_shipping/`, options);
    },

    /**
     * Cancel
     */
    Cancel(options) {
        return post(`/api/order/cancel/`, options);
    },
};
