import { Layout } from 'antd';
import I18nToggleBtns, { Logo } from './I18nToggleBtns';

const { Header, Content } = Layout;

interface Props {
    title?;
    children;
}

export default function HomeWrapper({ title, children }: Props) {
    return (
        <Layout className="wrapper">
            <Header className="header">
                <Logo />
                <I18nToggleBtns />
            </Header>
            <Content style={{ overflowY: 'auto' }}>
                <h4 className="title">{title}</h4>
                <div className="container">{children}</div>
            </Content>

            <style jsx>{`
                :global(.wrapper) {
                    height: 100%;
                }
                :global(.header) {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #dee0e2;
                }
                .title {
                    text-align: center;
                    margin-top: 2em;
                    font-size: 1.7em;
                }
                .title-logo {
                    width: 1.5em;
                    margin-right: 0.5em;
                }
                .container {
                    width: min(450px, 90%);
                    margin: 1.5em auto;
                    background: #fff;
                    padding: 3.5em 2em 1.5em;
                }
            `}</style>
        </Layout>
    );
}
