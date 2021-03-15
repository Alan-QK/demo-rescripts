import { useRequest } from '@gui/request';
// class ApiDailyReportClass
export const ApiDailyReport = {
    exportUrl: '/api/inventoryreport/export/',

    /**
     * Detail 详情
     */
    Detail({ id }) {
        return (props) => {
            const { axiosOptions, ...otherProps } = props || {};
            const { params, ...otherAxiosOptions } = axiosOptions || {};
            const options = {
                axiosOptions: { params: { ...params, inventory_report: id }, ...otherAxiosOptions },
                ...otherProps,
            };
            return useRequest(`/api/inventoryreportitem/`, options);
        };
    },

    /**
     * List Product 列表 POST请求
     */
    List(options) {
        return useRequest('/api/inventoryreport/', options);
    },
};
