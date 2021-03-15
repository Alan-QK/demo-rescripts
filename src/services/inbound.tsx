import { useRequest, post, get, put, del } from '@gui/request';
export default {
    /**
     * Add 新增产品
     */
    Add(options) {
        return post(`/api/grn/upload_files/`, options);
    },

    /**
     * Edit 修改
     */
    Edit({ ...options }) {
        return put(`/api/grn/upload_files/`, options);
    },

    /**
     * Detail 详情
     */
    Detail({ id }) {
        return get(`/api/grn/${id}/`);
    },

    /**
     * List GRN 列表
     */
    List(options) {
        return useRequest('/api/grn/', options);
    },

    /**
     * Del GRN 删除
     */
    Del({ id, ...options }) {
        return del(`/api/grnpod/${id}/`, options);
    },

    /**
     * DelFile 删除文件
     */
    DelFile({ id, type = '' }) {
        switch (type) {
            case 'pods':
                return del(`/api/grnpod/${id}/`, {});
            case 'others':
                return del(`/api/grnotherfile/${id}/`, {});
            default:
                return del(`/api/tallyreportfile/${id}/`, {});
        }
    },

    /**
     * Import Product 导入
     */
    TallyReport({ id }) {
        return get(`/api/tallyreport/${id}/`);
    },
};

export const ApiTallyReport = {
    /**
     * Get Tally Report Template
     */

    templateUrl: '/api/tallyreport/template/',
    exportUrl: '/api/tallyreport/export/',

    /**
     * List
     */
    List(options) {
        return useRequest('/api/tallyreport/', options);
    },

    /**
     * Detail
     */
    Detail({ id }) {
        return get(`/api/tallyreport/${id}/summary/`);
    },

    /**
     * Del Tally Report 删除
     */
    DelTallyReport({ id, ...options }) {
        return del(`/api/tallyreport/${id}/`, options);
    },

    /**
     * Export
     */
    Export(options) {
        return post(`/api/tallyreport/export/`, options);
    },
};
