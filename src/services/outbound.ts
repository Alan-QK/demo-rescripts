import { useRequest, post, get } from '@gui/request';

export default {
    scanExportUrl: '/api/outbound-line/export/',
    templateUrl: '/api/outbound/template/',

    /**
     * List
     */
    List(options) {
        return useRequest(`/api/outbound/`, options);
    },

    /**
     * List
     */
    WarehouseOwner(options) {
        return get(`/api/warehouse/owner/`, options);
    },

    /**
     * Detail
     */
    Detail({ id, ...options }) {
        return get(`/api/outbound/${id}/`, options);
    },

    /**
     * Import Outbound 文件上传
     */
    Add(options) {
        return post(`/api/outbound/import/`, options);
    },

    /**
     * EvidenceImport 上传更多证据文件
     */
    EvidenceImport(id, options) {
        return post(`/api/outbound/${id}/evidence/`, options);
    },

    /**
     * ScanList
     */
    ScanList(options) {
        return useRequest(`/api/outbound-line/list/`, options);
    },

    /**
     * ScanList
     */
    ScanExport(options) {
        return post(`/api/outbound-line/export/`, options);
    },

    /**
     * TallyReport
     */
    TallyReport(options) {
        return post(`/api/grn/upload_files/`, options);
    },
};
