import { useRequest, post, get, del } from '@gui/request';

export const ApiNotifier = {
    /**
     * Notifier
     */
    Notifier(options) {
        return get('/api/notifier/', options);
    },

    /**
     * SetNotifier
     * @param event_code
     * @param name
     * @param email
     */
    SetNotifier(options) {
        return post('/api/notifier/', options);
    },

    /**
     * DelNotifier
     */
    DelNotifier({ id }) {
        return del(`/api/notifier/${id}/`, {});
    },
};

export const ApiEvents = {
    /**
     * Events
     */
    List() {
        return get('/api/notifier/event_code/');
    },

    /**
     * Logs
     */
    Logs(options) {
        return useRequest('/api/event/', options);
    },
};
