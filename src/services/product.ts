import { useRequest, post, get, put } from '@gui/request';
export default {
    templateUrl: '/api/catalog/template/',
    exportUrl: '/api/catalog/export/',

    /**
     * Add 新增产品
     */
    Add(options) {
        return post(`/api/catalog/`, options);
    },

    /**
     * Edit 修改
     */
    Edit({ id, ...options }) {
        return put(`/api/catalog/${id}/`, options);
    },

    /**
     * Detail 详情
     */
    Detail({ id }) {
        return get(`/api/catalog/${id}/`);
    },

    /**
     * List Product 列表 POST请求
     */
    List(options) {
        return useRequest('/api/catalog/list/', options);
    },

    /**
     * UploadImg Product 上传图片
     */
    UploadImg({ id, ...options }) {
        return post(`/api/catalog/${id}/image/`, options);
    },

    /**
     * Export Product 导出
     */
    Export(options) {
        return post(`/api/catalog/export/`, options);
    },

    /**
     * Import Product 导入
     */
    Import(options) {
        return post(`/api/catalog/import/`, options);
    },
};
