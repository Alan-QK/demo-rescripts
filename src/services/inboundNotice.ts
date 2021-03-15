import { useRequest, post, get, del, patch } from '@gui/request';

export const ApiInboundNotice = {
    templateUrl: '/api/inboundnoticefile/template/',
    /**
     * Detail 详情
     */
    Detail(options) {
        return useRequest(`/api/inboundnoticeitem/`, options);
    },
    /**
     * List Asn 列表
     */
    List(options) {
        return useRequest('/api/inboundnotice/', options);
    },
    /**
     * Import Product 导入
     */
    Import(options) {
        return post(`/api/asn/import/`, options);
    },
    /**
     * Add 新增发货计划
     */
    Add(options) {
        return post(`/api/inboundnoticefile/`, options);
    },
};

export const ApiAsn = {
    templateUrl: '/api/asn/template/',

    /**
     * Add 新增ASN
     */
    Add(options) {
        return post(`/api/asn/import/`, options);
    },

    /**
     * Edit 修改
     */
    Del({ id }) {
        return del(`/api/asn/${id}/`, {});
    },

    /**
     * Detail 详情
     */
    Detail({ id }) {
        return get(`/api/asn/${id}/`);
    },

    /**
     * List Asn 列表
     */
    List(options) {
        return useRequest('/api/asn/', options);
    },

    /**
     * Import Product 导入
     */
    Import(options) {
        return post(`/api/asn/import/`, options);
    },

    /**
     * Import Product 导入
     */
    Update({ id, ...options }) {
        return patch(`/api/asn/${id}/`, options);
    },
};

export const ApiContainer = {
    /**
     * List Container 列表
     */
    List(options?) {
        return useRequest('/api/container/', options);
    },

    /**
     * Detail 详情
     */
    Detail({ id }) {
        return get(`/api/container/${id}/`);
    },

    /**
     * Skus Skus
     */
    Skus({ id }) {
        return get(`/api/container/${id}/summary/`);
    },

    /**
     * Skus Skus
     */
    UpdateOwner({ id, ...options }) {
        return patch(`/api/container/${id}/`, options);
    },

    /**
     * Notifiers,
     */
    Notifiers({ id }) {
        return get(`/api/container/${id}/notifiers/`);
    },
    SetNotifiers({ id, ...options }) {
        return post(`/api/container/${id}/notifiers/`, options);
    },
};

export const ApiPallet = {
    /**
     * List Pallet 列表
     */
    List(options) {
        return useRequest('/api/pallet/', options);
    },

    /**
     * Detail 详情
     */
    Detail({ id }) {
        return get(`/api/pallet/${id}/`);
    },
};

export const ApiCarton = {
    /**
     * List Carton 列表
     */
    List(options) {
        return useRequest('/api/carton/', options);
    },

    /**
     * Detail 详情
     */
    Detail({ id }) {
        return get(`/api/carton/${id}/`);
    },
};

export const ApiEach = {
    /**
     * List Each 列表
     */
    List(options) {
        return useRequest('/api/each/', options);
    },

    /**
     * Detail 详情
     */
    Detail({ id }) {
        return get(`/api/each/${id}/`);
    },
};
