import { useState, useEffect, createContext, useContext } from 'react';
import { ConfigProvider } from 'antd';
import moment from 'moment';
// import { i18n } from '@i18n';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/lib/locale/zh_CN';
import enGB from 'antd/lib/locale/en_GB';
import store from '@store';
import Cookies from 'js-cookie';

export const LangCtx = createContext({} as any);

const I18nConsume = ({ children }) => {
    const { i18n } = useTranslation();
    const { lang } = useContext(LangCtx);
    const [localLang, setLocalLang] = useState<any>();
    useEffect(() => {
        i18n.changeLanguage(lang, () => {
            if (lang === 'zh') {
                setLocalLang(zhCN);
                moment.locale('zh-cn');
            } else {
                setLocalLang(enGB);
                moment.locale('en');
            }
            Cookies.set('lang', lang);
        });
    }, [lang, i18n]);

    if (!localLang) return null;
    return <ConfigProvider locale={localLang}>{children}</ConfigProvider>;
};

const I18nApp = ({ children }) => {
    const [lang, setLang] = useState();
    useEffect(() => {
        let navigatorLang = navigator.language; //常规浏览器语言和IE浏览器
        navigatorLang = navigatorLang.substr(0, 2); //截取lang前2位字符

        // 优先级别
        // ==> cookie中的语言类型  0
        // ==> 浏览器的语种  1
        const lang =
            localStorage.getItem('lang') ||
            Cookies.get('lang') ||
            (navigatorLang.includes('zh') ? 'zh' : 'en');

        if (!Cookies.get('lang')) {
            Cookies.set('lang', navigatorLang.includes('zh') ? 'zh' : 'en');
        }

        setLang(lang || store('i18n') || 'zh');
    }, []);

    if (!lang) return null;
    return (
        <LangCtx.Provider value={{ lang, toggleLang: setLang }}>
            <I18nConsume>{children}</I18nConsume>
        </LangCtx.Provider>
    );
};

export default I18nApp;
