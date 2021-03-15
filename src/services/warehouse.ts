import { useRequest, post, put, del, get } from '@gui/request';

export const ApiWarehouse = {
    /**
     * @name Add
     * Add 仓库创建,
     */
    Add(options) {
        return post(`/api/warehouse/`, options);
    },
    /**
     * Edit 仓库修改
     */
    Edit({ id, ...options }) {
        return put(`/api/warehouse/${id}/`, options);
    },
    /**
     * List 仓库列表
     */
    List(options?) {
        return get('/api/warehouse/', options);
    },
    AsyncList(options?) {
        return useRequest('/api/warehouse/', options);
    },
    /**
     * Detail 仓库详情
     */
    Detail({ id }) {
        return get(`/api/warehouse/${id}/`);
    },
    /**
     * ApiMaintenance API信息维护
     */
    ApiMaintenance({ id, ...options }) {
        return post(`/api/warehouse/${id}/api/`, options);
    },
    /**
     * 绑定到客户
     */
    ApiBindToAccouts(options) {
        return post(`/api/accountwarehouse/batch/`, options);
    },
    /**
     * 获取绑定信息
     */
    ApiBindedAccouts({ id, ...options }) {
        return get(`/api/accountwarehouse/`, { warehouse: id, ...options });
    },
    /**
     * 设置费率
     */
    Fee({ id, ...options }) {
        return post(`/api/warehouse/${id}/storage_fees/`, options);
    },
    GetFee(options) {
        return get(`/api/warehousestoragefee/`, options);
    },
    GetWarehouseApis(options) {
        return get(`/api/warehouseapi/`, options);
    },
    editWarehouseApi({ id, ...options }) {
        return post(`/api/warehouse/${id}/api/`, options);
    },
};

export const ApiContact = {
    /**
     * Add 创建仓库联系人
     */
    Add({ id, ...options }) {
        return post(`/api/warehouse/${id}/contact/`, options);
    },
    /**
     * Del 删除仓库联系人
     */
    Del({ id, ...options }) {
        return del(`/api/warehouse/${id}/contact/`, options);
    },
    /**
     * Edit 修改仓库联系人
     */
    Edit({ id, ...options }) {
        return put(`/api/warehouse/${id}/contact/`, options);
    },
};

export const ApiService = {
    /**
     * All
     */
    Services(options = {}) {
        return get(`/api/warehousecarrierservice/`, options);
    },
    Detail({ id, ...options }) {
        return get(`/api/warehousecarrierservice/${id}/`, options);
    },
    Bind({ ...options }) {
        return post(`/api/warehousecarrierservice/`, options);
    },
    UnBind({ id }) {
        return del(`/api/warehousecarrierservice/${id}/`, {});
    },
};
