import { useEffect } from 'react';
import useRouter from 'utils/useRouter';
import { withTranslation } from '@i18n';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

// import { findCurrentRouterByPath } from './Crumb';
import { AccessAuth } from 'utils/usePermission';

const NavMenu = ({ t }) => {
    const { asPath, query } = useRouter();
    const clearPath = asPath.split('?')[0];
    // const [current, setCurrent] = useState<string>('/');

    const menus = AccessAuth('menus');

    useEffect(() => {
        // if (clearPath === '/') {
        //     setCurrent('/');
        // } else {
        //     const currentFaPage = clearPath.split('/')[1] || '';
        //     const router = findCurrentRouterByPath(menus, `/${currentFaPage}`, query);
        //     const subMenus = router?.subMenus?.filter((m) => m.isShow);
        //     const current = subMenus?.length
        //         ? findCurrentRouterByPath(router?.subMenus, clearPath, query)
        //         : router;
        //     setCurrent(current?.key || '');
        // }
    }, [clearPath, query, menus]);

    const renderMenu = (m) => {
        if (!m) return null;
        const subMenus = m?.subMenus?.filter((m) => m.isShow);
        if (subMenus?.length) {
            return (
                <Menu.SubMenu
                    key={m.key}
                    className="no-border-menu-item"
                    title={!!m.label && t(`menu.${m.label}`)}
                >
                    {subMenus?.map((sub) => renderMenu(sub))}
                </Menu.SubMenu>
            );
        }
        return (
            <Menu.Item key={m.key} className="no-border-menu-item">
                <Link to={m.redirectTo ?? m.href}>
                    <span>{!!m.label && t(`menu.${m.label}`)}</span>
                </Link>
            </Menu.Item>
        );
    };

    if (!menus) return null;
    return (
        <Menu mode="horizontal" selectedKeys={[]} theme="dark">
            {menus?.map((menu) => renderMenu(menu))}

            <style jsx>{`
                :global(.ant-menu-dark.ant-menu-horizontal) {
                    line-height: 0;
                }
                :global(.ant-menu-horizontal > .ant-menu-item.no-border-menu-item) {
                    padding: 0;
                }
                :global(.ant-menu-submenu.ant-menu-submenu-horizontal.ant-menu-submenu-active
                        .title) {
                    color: orange !important;
                }
                :global(.ant-menu-submenu.ant-menu-submenu-horizontal) {
                    line-height: 46px;
                }
                :global(.ant-menu-horizontal > .ant-menu-item.no-border-menu-item > a),
                :global(.ant-menu-horizontal > .ant-menu-submenu.no-border-menu-item > a) {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    font-weight: 600;
                    border-top-width: 4px;
                    border-bottom-width: 4px;
                    border-style: solid;
                    border-color: transparent;
                    box-sizing: border-box;
                    line-height: 40px;
                    padding: 0 1rem;
                }
                :global(.ant-menu-horizontal
                        > .ant-menu-item.no-border-menu-item.ant-menu-item-active
                        > a),
                :global(.ant-menu-horizontal
                        > .ant-menu-item.no-border-menu-item.ant-menu-item-selected
                        > a) {
                    border-top-color: orange;
                }
            `}</style>
        </Menu>
    );
};
export default withTranslation('layout_i18n')(NavMenu);
