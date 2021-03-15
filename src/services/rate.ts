import { useRequest, post, get } from '@gui/request';
export const ApiRate = {
    templateUrl: '/api/rates/template/',
    /**
     * Logs
     */
    Rates(options) {
        return useRequest('/api/rates/', options);
    },
    /**
     * Update
     */
    Update({ id, is_active }) {
        if (is_active) {
            return post(`api/rates/${id}/inactive/`, {});
        }
        return post(`api/rates/${id}/active/`, {});
    },

    /**
     * DelNotifier
     */
    Download({ id }) {
        return `/api/rates/${id}/source-file/`;
    },

    /**
     * Parse
     */
    Parse(options) {
        return post('/api/rates/parse/', options);
    },

    /**
     * Create
     */
    Create(options) {
        return post('/api/rates/', options);
    },

    /**
     * Detail
     */
    Detail({ id }, isSync) {
        if (isSync) return useRequest(`/api/rates/${id}/`);
        return get(`/api/rates/${id}/`);
    },
};
