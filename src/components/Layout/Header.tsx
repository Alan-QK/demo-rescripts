import { useTranslation } from '@i18n';
import { Link } from 'react-router-dom';

import I18nToggleBtns from './I18nToggleBtns';
import { Layout } from 'antd';
import NavMenu from './NavMenu';
import UserSettingSelector from './UserSettingSelector';
import { AccessAuth } from 'utils/usePermission';

import logoImg from '@assets/img/logo.png';

export default function Header() {
    const { t } = useTranslation('layout_i18n');

    return (
        <Layout.Header className="flex-space-between">
            <div className="flex-space-between">
                <Link to="/">
                    <span>
                        <img className="logo" src={logoImg} alt="logo" />
                    </span>
                </Link>
                <NavMenu />
            </div>

            <div className="settings">
                {AccessAuth('basic', 'i18n') && <I18nToggleBtns />}
                <UserSettingSelector t={t} />
            </div>

            <style jsx>{`
                :global(.flex-space-between) {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                }

                .settings {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                }

                .logo {
                    width: 100px;
                    margin-bottom: 5px;
                }
            `}</style>
        </Layout.Header>
    );
}
