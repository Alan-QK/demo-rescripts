import { Popover } from 'antd';
export default function PasswordWrapper({ t, children }) {
    const rules = [
        t('common:password.r_1'),
        t('common:password.r_2'),
        t('common:password.r_3'),
        t('common:password.r_4'),
        t('common:password.r_5'),
    ];
    return (
        <Popover
            title={<p className="fz-s">{t('common:password.title')}</p>}
            content={rules?.map((i, idx) => (
                <p key={i} className="fz-s c-disabled">
                    <b>{idx + 1}</b>. {i}
                </p>
            ))}
            placement="right"
        >
            {children}
        </Popover>
    );
}
