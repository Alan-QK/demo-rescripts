import { useContext } from 'react';
import cx from 'classnames';

import { Layout, Spin } from 'antd';
import Header from './Header';
import Crumb from './Crumb';

import { AdminContext } from '@lib/index';
const { Content } = Layout;

export default function Wrapper({ noLayout, children }) {
    const { loading, loadingTip } = useContext(AdminContext);

    if (noLayout) return children;
    else {
        return (
            <>
                <Layout className={cx('layout', { 'global-loading': loading })}>
                    <Header />
                    <Layout>
                        <Crumb />
                        <Content className="layout-content">{children}</Content>
                    </Layout>
                </Layout>
                {loading && (
                    <Spin className="custom-spin global dark" tip={loadingTip ?? '加载中...'} />
                )}
                <div id="downloadDiv" hidden></div>
                <style jsx>{`
                    :global(.layout) {
                        height: 100%;
                    }
                    :global(.layout-content) {
                        padding: 0.8em 1.5em;
                        overflow-y: auto;
                        background: #fff;
                        display: flex;
                        flex-flow: column nowrap;
                    }
                    .load-section {
                        filter: blur(3px);
                        -webkit-filter: blur(3px);
                    }
                    :global(.global-loading) {
                        filter: blur(3px);
                    }
                    :global(.custom-spin) {
                        height: 100%;
                        width: 100%;
                        min-height: calc(100vh - 150px);
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: center;
                        justify-content: center;
                    }
                    :global(.custom-spin.global) {
                        position: fixed;
                        top: 0;
                        left: 0;
                        z-index: 100;
                        height: 100vh;
                        background: rgba(0, 0, 0, 0.2);
                    }
                `}</style>
            </>
        );
    }
}
