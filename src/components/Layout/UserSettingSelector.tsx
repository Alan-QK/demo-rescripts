import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { Menu, Dropdown, Avatar } from 'antd';
import { RightOutlined, LogoutOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';

import { ApiAccount } from '@services/account';
import { AdminContext, GlobalContext } from '@lib/index';
import { AccessAuth } from 'utils/usePermission';
import { SettingsMenus } from 'utils/MenuConfig';

export const Label = ({ children, ...props }) => {
    return (
        <span {...props} className="label">
            {children}
            <style jsx>{`
                .label {
                    margin-left: 1em;
                    font-size: 0.8em;
                    font-weight: 600;
                }
            `}</style>
        </span>
    );
};

const UserItem = ({ t, user }) => {
    return (
        <div className="d-flex flex-col wrapper">
            <span className="name">{user?.username}</span>
            {user?.account_name && (
                <span className="email">
                    {t('common:company')}
                    {t('common:colon')}
                    {user.account_name || '--'}
                </span>
            )}

            <style jsx>{`
                .wrapper {
                    padding: 0.2em 0;
                    line-height: 1.2;
                }
                span.name {
                    font-size: 1.3em;
                    font-weight: 700;
                }
                .email {
                    opacity: 0.8;
                }
            `}</style>
        </div>
    );
};

const UserSettingSelector = ({ t }) => {
    const history = useHistory();
    const { userInfo, dispatch } = useContext(AdminContext);
    const { globalDispatch } = useContext(GlobalContext);
    const [visible, setVisible] = useState(false);

    const items = [
        { key: 'me', label: <UserItem t={t} user={userInfo} />, href: '/' },
        AccessAuth('menus', 'account') && { key: 'account', label: t('userMgr'), href: '/account' },
        AccessAuth('basic', 'edit-password') && {
            key: 'passwword',
            label: t('menu.password_edit'),
            href: '/edit-password',
        },
        AccessAuth('basic', 'settings') && {
            key: 'settings',
            label: t('menu.settings'),
        },
        { key: 'logout', label: t('logout') },
    ].filter((i) => !!i);

    const clickMenu = ({ key }) => {
        switch (key) {
            case 'logout':
                // 退出登录操作
                dispatch(['toggleGlobalLoading', t('common:logouting')]);
                ApiAccount.SignUp()
                    .then(() => {
                        globalDispatch(['init']);
                        setTimeout(() => {
                            history.replace('/signin');
                        });
                    })
                    .finally(() => dispatch(['toggleGlobalLoading']));
                break;
            default:
                break;
        }
    };

    const renderItem = (item, isSub?) => {
        if (item.href) {
            return (
                <Link to={item.href}>
                    <div className={cx('menu-item', { [item.key]: item.key })}>
                        {item.label}
                        {!isSub && <RightOutlined />}
                    </div>
                </Link>
            );
        }
        return (
            <div className={cx('menu-item', { [item.key]: item.key })}>
                {item.label}
                {!isSub && (item.key === 'logout' ? <LogoutOutlined /> : <RightOutlined />)}
            </div>
        );
    };
    return (
        <>
            <Dropdown
                trigger={['click']}
                overlayClassName="custom-header-menu"
                onVisibleChange={setVisible}
                placement="bottomRight"
                overlayStyle={{ width: '14em', boxShadow: '2px 2px 5px #999' }}
                overlay={
                    <Menu onClick={clickMenu}>
                        {items?.map((item) =>
                            item?.key === 'settings' ? (
                                <Menu.SubMenu
                                    className="fz-s"
                                    key={item.key}
                                    title={<span className="fz-s">{item.label}</span>}
                                >
                                    {SettingsMenus.map((sub_menu) => (
                                        <Menu.Item className="fz-s" key={sub_menu.key}>
                                            {renderItem(
                                                { ...sub_menu, label: t(`menu.${sub_menu.label}`) },
                                                true
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.SubMenu>
                            ) : (
                                <Menu.Item className="fz-s" key={item.key}>
                                    {renderItem(item)}
                                </Menu.Item>
                            )
                        )}
                    </Menu>
                }
            >
                <span className="setting-btn">
                    <Avatar
                        style={{ backgroundColor: '#40a9ff', marginRight: '0.5em' }}
                        icon={<UserOutlined />}
                    />
                    <DownOutlined
                        style={{ color: '#fff' }}
                        rotate={visible ? 180 : 0}
                        className="avatar-position-icon"
                    />
                </span>
            </Dropdown>

            <style jsx>{`
                .setting-btn {
                    display: inline-block;
                    margin-left: 1em;
                    line-height: 32px;
                }
                :global(.custom-header-menu .ant-dropdown-menu),
                :global(.custom-header-menu .ant-dropdown-menu-item) {
                    padding: 0;
                }
                :global(.custom-header-menu .ant-dropdown-menu) {
                    border-radius: 2px;
                    overflow: hidden;
                    filter: drop-shadow(rgba(39, 54, 78, 0.12) 0px 2px 10px)
                        drop-shadow(rgba(39, 54, 78, 0.12) 4px 12px 40px);
                }
                :global(.menu-item) {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem 1.2rem;
                }
                :global(.ant-dropdown-menu-submenu-title) {
                    padding: 0;
                    padding: 0.5rem 1.2rem;
                }
                :global(.ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-expand-icon) {
                    right: 1.1em;
                }
                :global(.menu-item.me) {
                    background: #096dd9;
                    color: #fff;
                }
                :global(.menu-item.me:hover) {
                    background: #0050b3;
                }
                :global(.menu-item.logout) {
                    border-top: 1px solid #ddd;
                }

                :global(.avatar-position-icon) {
                    transition: 0.5s all;
                }
            `}</style>
        </>
    );
};

export default UserSettingSelector;
