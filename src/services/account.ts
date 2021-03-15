import { useRequest, post, get, put, patch, del } from '@gui/request';

export const ApiAccount = {
    /**
     * Login
     */
    SignIn(options) {
        return post('/api/token/access/', options);
    },

    /**
     * Logout
     */
    SignUp(options?) {
        return post('/api/token/release/', options || {});
    },

    /**
     * Status User 登录状态
     */
    Status() {
        return get('/api/user/status/');
    },

    /**
     * EditPassword 用户修改密码
     */
    EditPassword(options) {
        return post('/api/user/password/', options);
    },
};

export const ApiUser = {
    /**
     * List User 用户列表
     */
    List(options) {
        return useRequest('/api/user/', options);
    },

    /**
     * Create User 创建普通用户
     */
    Create(options) {
        return post('/api/user/', options);
    },

    /**
     * Detail User 用户详情
     */
    Detail({ id }) {
        return get(`/api/user/${id}/`);
    },

    /**
     * UpdatePwd User 用户修改密码
     */
    UpdatePwd(options) {
        return post(`/api/user/password/`, options);
    },

    /**
     * Permission User 用户权限
     */
    Permission({ id }) {
        return get(`/api/user/${id}/permission/`);
    },

    /**
     * UpdatePermission User 用户权限修改
     */
    UpdatePermission({ id, ...options }) {
        return post(`/api/user/${id}/permission/`, options);
    },

    /**
     * BindWarehouse User 绑定仓库
     */
    BindWarehouse({ id, ...options }) {
        return post(`/api/user/${id}/warehouse/`, options);
    },

    /**
     * Warehouse User 绑定仓库详情
     */
    Warehouse({ id, ...options }) {
        return get(`/api/user/${id}/warehouse/`, options);
    },

    /**
     * Warehouse User 绑定仓库详情
     */
    Auth() {
        return get(`/api/user/status/`);
    },
};

export const ApiCompany = {
    /**
     * Create Account 账户创建
     */
    Create(options) {
        return post('/api/account/', options);
    },

    /**
     * Edit Account 账户修改
     */
    Edit({ id, ...options }) {
        return put(`/api/account/${id}/`, options);
    },

    /**
     * List Account 账户列表,
     */
    List(options?) {
        return get('/api/account/', options);
    },
    AsyncList(options?) {
        return useRequest('/api/account/', options);
    },

    /**
     * 绑定 仓库
     */
    BindWarehouse(options) {
        return post('/api/accountwarehouse/batch/', options);
    },
};

export const ApiTemplate = {
    /**
     * Permisson Template 创建
     */
    Create(options) {
        return post('/api/permission-template/', options);
    },

    /**
     * Permisson Template 修改
     */
    Edit({ id, ...options }) {
        return patch(`/api/permission-template/${id}/`, options);
    },

    /**
     * Permisson Template 修改
     */
    Detail({ id, ...options }) {
        return get(`/api/permission-template/${id}/`, options);
    },

    /**
     * Permisson Template 修改
     */
    Del({ id }) {
        return del(`/api/permission-template/${id}/`, {});
    },

    /**
     * Permisson Template 列表
     */
    List() {
        return get('/api/permission-template/?limit=100');
    },

    /**
     * Permisson Template 列表
     */
    AysncList(options) {
        return useRequest('/api/permission-template/', options);
    },
};
