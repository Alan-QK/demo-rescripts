import { useContext } from 'react';
import { Row, Col } from 'antd';
import { withTranslation } from '@i18n';

import { WarehouseSection, PackageSection, Collection } from '@components/home/Sections';
import { AccessAuth } from 'utils/usePermission';
import { AdminContext } from '@lib/index';

function Home({ t }) {
    const { userInfo } = useContext(AdminContext);

    return (
        <div>
            {!AccessAuth('dashboard') ? (
                <Row style={{ marginBottom: '1em' }}>
                    <Col md={24} sm={24}>
                        <h2 className="page-title empty">
                            {t('welcome', { name: userInfo?.username })}
                        </h2>
                    </Col>
                    <Col span={24}>
                        <Collection t={t} />
                    </Col>
                </Row>
            ) : (
                <Row style={{ marginBottom: '1em' }}>
                    <Col md={24} sm={24}>
                        <h2 className="page-title">{t('welcome', { name: userInfo?.username })}</h2>
                    </Col>
                    <Col span={24}>
                        <Collection t={t} />
                    </Col>
                    {AccessAuth('dashboard', 'warehouse') && (
                        <Col md={12} sm={24}>
                            <WarehouseSection t={t} />
                        </Col>
                    )}
                    {AccessAuth('dashboard', 'container') && (
                        <Col md={12} sm={24}>
                            <PackageSection t={t} />
                        </Col>
                    )}
                </Row>
            )}
            <style jsx>{`
                .page-title {
                    font-weight: 700;
                    color: #595959;
                    font-size: 1.6em;
                    margin-bottom: 0.5em;
                }
                .page-title.empty {
                    margin: 2em 0;
                }
            `}</style>
        </div>
    );
}

Home.getInitialProps = async () => ({
    title: 'home',
    namespacesRequired: ['i18n_index'],
});

export default withTranslation('i18n_index')(Home);
