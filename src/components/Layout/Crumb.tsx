// import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import useRouter from 'utils/useRouter';
import { useTranslation } from '@i18n';

import { Tag } from 'antd';
import { StepForwardOutlined } from '@ant-design/icons';
import TaskAlerts from '@components/TaskAlerts';

// import { AllMenus } from 'utils/MenuConfig';
import { AccessAuth } from 'utils/usePermission';
const { CheckableTag } = Tag;

const isSame = (path, href, query) => {
    const reg = /\[([^\[\]]+)\]/g;
    const params = href?.match(reg)?.map((i) => i.slice(1, -1));
    const url = params ? params?.reduce((str, p) => str.replace(`[${p}]`, query[p]), href) : href;

    return decodeURI(path) === url;
};

export const findCurrentRouterByPath = (menus, path, query) => {
    if (!menus) return null;
    return menus?.find((m) => isSame(path, m?.href, query));
};

const findCurrentRouterByKey = (key, menus) => {
    return menus?.find((m) => m?.key === key);
};

export default function Crumb() {
    const { t } = useTranslation('layout_i18n');
    const router = useRouter();
    const { asPath, query } = router;
    const [subMenus /*setSubMenus*/] = useState<any>();
    const clearPath = asPath.split('?')[0];
    const [currentRouterLabel /*setCurrentRouterLabel*/] = useState<any>();
    const [selectedTags, setSelectedTags] = useState<any>();

    useEffect(() => {
        // let current = '';
        // if (clearPath === '/') {
        //     current = 'home';
        // } else {
        //     const currentFaPage = clearPath.split('/')[1] || '';
        //     let router = findCurrentRouterByPath(AllMenus, `/${currentFaPage}`, query);
        //     current = router?.label;
        //     setSubMenus(router?.subMenus);
        // }
        // setCurrentRouterLabel(current);
    }, [clearPath, query]);

    useEffect(() => {
        const current_router = findCurrentRouterByPath(subMenus, clearPath, query);
        if (current_router?.key) {
            setSelectedTags([current_router?.key]);
        }
    }, [subMenus]);

    const renderSubMenus = (menus) => {
        if (!menus) return null;
        const handleChange = (tag, checked) => {
            if (!checked) return;
            setSelectedTags([tag]);

            const next = findCurrentRouterByKey(tag, menus);
            if (next.href) {
                router.push(next.as || next.href);
            }
        };

        return (
            <div className="crumb">
                {menus?.map((sub) =>
                    sub?.isShowCurrent && !isSame(clearPath, sub.href, query) ? null : AccessAuth(
                          'subMenus',
                          sub?.key
                      ) || sub.isNotSetting ? (
                        <CheckableTag
                            key={sub.key}
                            checked={selectedTags?.indexOf(sub.key) > -1}
                            onChange={(checked) => handleChange(sub.key, checked)}
                        >
                            {t(`menu.${sub.label}`)}
                        </CheckableTag>
                    ) : null
                )}
                <style jsx>{`
                    .crumb {
                        position: relative;
                        flex: 1;
                        padding: 0 2em;
                        color: #666;
                    }
                    .sub span {
                        margin-right: 1.5em;
                    }
                `}</style>
            </div>
        );
    };

    return (
        <div className="wrapper">
            <StepForwardOutlined />
            <span className="mr-2">{t('positionAt')}</span>
            <span className="router">
                {!!currentRouterLabel && t(`menu.${currentRouterLabel}`)}
            </span>
            {renderSubMenus(subMenus)}
            <TaskAlerts />
            <style jsx>{`
                .wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    color: #333;
                    padding: 0.5em 3em;
                    font-size: 0.7rem;
                    font-weight: 700;
                    line-height: 2em;
                    margin: 0;
                }
                .router {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
}
