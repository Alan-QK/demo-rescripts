import { useRequest, post, get } from '@gui/request';

export const ApiOutbound = {
    /**
     * @name List
     * Outbound 文件上传记录列表
     */
    List(options) {
        return useRequest(`/api/outbound/`, options);
    },

    /**
     * @name Detail
     * 详情
     */
    Detail({ id }) {
        return get(`/api/outbound/${id}/`);
    },

    /**
     * @name Creat
     * Outbound 文件上传
     */
    Creat(options) {
        return post(`/api/outbound/import/`, options);
    },

    /**
     * @name UploadMoreFile
     * Outbound 上传更多证据文件
     */
    UploadMoreFile({ id, ...options }) {
        return post(`/api/outbound/${id}/evidence/`, options);
    },

    /**
     * @name ScanList
     * Outbound Scan 列表
     */
    ScanList(options) {
        return post(`/api/outbound-line/list/`, options);
    },

    /**
     * @name ScanImport
     * Outbound Scan 导出
     */
    ScanImport(options) {
        return post(`/api/outbound-line/export/`, options);
    },
};
