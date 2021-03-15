import { useState, useEffect, useContext } from 'react';
import useRouter from 'utils/useRouter';
import { AdminContext } from '@lib/index';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import Menus, { AllMenus } from 'utils/MenuConfig';
import { ApiUser } from '@services/account';

export function hasPer(permissions, key) {
    if (!permissions) return false;
    return permissions?.includes(key);
}

// 根据用户配置去调整菜单展示项
function filterMenusByUserInfo(menus, confs) {
    return menus.reduce((newMenus: Array<MenuItemProps>, item: MenuItemProps) => {
        if (has(confs, item.key) || item?.isNotSetting) {
            if (has(item, 'subMenus')) {
                const _subMenus = filterMenusByUserInfo(item.subMenus, confs[item.key]);
                if (_subMenus?.length) {
                    return [...newMenus, { ...item, subMenus: _subMenus }];
                }
                return newMenus;
            } else {
                return [...newMenus, item];
            }
        } else return newMenus;
    }, []);
}

const getPathKeys = (itemKeys, asPath) => {
    if (itemKeys) return itemKeys;

    const paths = asPath.slice(1).split('?')[0].split('/');
    const pathGroup = [];
    paths.forEach((name, idx) => {
        if (idx === 0) {
            const menu = AllMenus.find((i) => i.href === '/' + name);
            menu && pathGroup.push(menu);
        } else {
            const subItem = pathGroup[idx - 1]?.subMenus?.find(
                (sub) => sub?.href === '/' + paths.join('/')
            );
            subItem && pathGroup.push(subItem);
        }
    }, []);

    const pathKeys = pathGroup?.map((i) => i.key);
    return pathKeys;
};
export interface MenuItemProps {
    label: string;
    key: string;
    href?: string;
    icon?: string;
    isNotSetting?: boolean;
    subMenus?: Array<{
        label: string;
        key: string;
        href?: string;
        isNotSetting?: boolean;
    }>;
}

export function usePermissionMenus() {
    const [menus, setMenus] = useState([]);
    const { userInfo } = useContext(AdminContext);

    useEffect(() => {
        setMenus(filterMenusByUserInfo(Menus, userInfo?.permission?.menus));
    }, [userInfo]);

    return menus;
}

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>();
    // @ts-nocheck
    const { pathname } = useRouter();

    useEffect(() => {
        setLoading(true);
        ApiUser.Auth()
            .then((res) => {
                setUser(res);
            })
            .finally(() => setLoading(false));
    }, [pathname]);

    return { loading, user };
}

export function AccessAuth(type, key?, itemKeys?) {
    const { userInfo } = useContext(AdminContext);
    const { permission } = userInfo || {};
    if (!permission || isEmpty(permission)) return false;
    const { menus, ...basicPermissions } = permission;

    // const { asPath } = useRouter();
    const asPath = '';
    const paths = asPath.slice(1).split('?')[0].split('/');
    const pathGroup = [];
    if (!itemKeys) {
        paths.forEach((name, idx) => {
            if (idx === 0) {
                const menu = AllMenus.find((i) => i.href === '/' + name);
                menu && pathGroup.push(menu);
            } else {
                const subItem = pathGroup[idx - 1]?.subMenus?.find(
                    (sub) => sub?.href === '/' + paths.join('/')
                );
                subItem && pathGroup.push(subItem);
            }
        }, []);
    }

    const pathKeys = getPathKeys(itemKeys, asPath);
    switch (type) {
        case 'menus': {
            if (!menus || isEmpty(menus)) return false;
            if (key) return menus[key];
            return filterMenusByUserInfo(Menus, menus);
        }
        case 'action': {
            const { actions } =
                menus?.[pathKeys[0]]?.[pathKeys[1] || Object.keys(menus?.[pathKeys[0]])[0]] || {};
            return actions?.includes(key);
        }
        case 'subMenus': {
            const currentMenuSubAgent = AllMenus.find((m) => m?.key === pathKeys[0])?.subAgent;
            const AuthActionsMenus = menus?.[pathKeys[0]]?.[currentMenuSubAgent]?.actions || [];
            const AuthSubMenus = [...Object.keys(menus?.[pathKeys[0]] || {}), ...AuthActionsMenus];
            return AuthSubMenus.includes(key);
        }
        case 'columns': {
            // TODO
            break;
        }
        case 'dashboard': {
            const { dashboard } = basicPermissions || {};
            if (!key) return !!dashboard?.length;
            return dashboard?.includes(key);
        }
        case 'basic': {
            return basicPermissions?.[key];
        }
        default:
            break;
    }
}
