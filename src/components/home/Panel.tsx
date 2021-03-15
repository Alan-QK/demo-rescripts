import { Link } from 'react-router-dom';
interface Props {
    title: string;
    titleExtra?: any;
    children?;
    href?: string;
    [propname: string]: any;
}
export default function Panel({ t, title, titleExtra, children, href, ...props }: Props) {
    return (
        <div className="panel" {...props}>
            <div className="panel-title">
                <span>{title}</span>
                {titleExtra}
                {href && (
                    <Link to={href}>
                        <span className="link">{t('panel.detail')}</span>
                    </Link>
                )}
            </div>

            <section>{children}</section>
            <style jsx>{`
                .panel {
                    border: 1px solid #ddd;
                    margin: 0.5em;
                    height: 100%;
                }
                .panel-title {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    padding: 0.5em 1em;
                    border-bottom: 1px solid #ddd;
                }
                .panel-title > span:nth-child(1) {
                    font-weight: 700;
                    font-size: 1.1em;
                }
                .panel-title .link {
                    font-size: 0.8em;
                }
                .panel section {
                    padding: 1.5em 1em;
                }
            `}</style>
        </div>
    );
}
