//全局文件
import './main';
import { useEffect } from 'react';
//路由
import { useLocation } from 'react-router-dom';

// others
// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';
import _isUndefined from 'lodash/isUndefined';
import { interceptResponse } from '@gui/request';
import 'moment/locale/zh-cn';
import { I18nApp, GlobalContextProvider } from 'lib/index';

//布局组件
import ContentMain from 'components/ContentMain'; //主题

//UI-antd-按需引入
import 'antd/dist/antd.less';
// import '@assets/css/test.css';
// import '@assets/css/style.less';
// import '@assets/css/nprogress.less';

function usePageTitle() {
    const location = useLocation();
    useEffect(() => {
        document.title = global.page_title || 'page2';
    }, [location]);
}

interceptResponse({
    handleUnauthorized: () => {
        window.location.href = '/signin';
        localStorage.removeItem('currentUserId');
    },
    handleSuccess: (res: any) => {
        if (!_isUndefined(res?.data?.data)) {
            return res.data.data;
        }
        return res;
    },
});

if (process.env.NODE_ENV === 'production') {
    // Sentry.init({
    //     dsn: 'https://af93b1bcd999473fa8bfa8e263317738@o514461.ingest.sentry.io/5618925',
    //     integrations: [new Integrations.BrowserTracing()],
    //     environment: process.env.NODE_ENV || 'development',
    //     // We recommend adjusting this value in production, or using tracesSampler
    //     // for finer control
    //     tracesSampleRate: 1.0,
    // });
}

const App = () => {
    usePageTitle();

    return (
        <I18nApp>
            <GlobalContextProvider>
                <ContentMain />
            </GlobalContextProvider>
        </I18nApp>
    );
};

export default App;
