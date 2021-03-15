import { Tooltip, message } from 'antd';
import { useTranslation } from '@i18n';
import { CopyFilled } from '@ant-design/icons';

export default function CopyBtn({ val, tip, ...props }) {
    const { t } = useTranslation('common');
    if (!val) return null;

    const copyLink = () => {
        document.designMode = 'on';
        const bool = document.execCommand('copy');
        if (!bool) {
            message.error(t('action.failed', { action: t('copy') }));
        } else {
            const inputEle = document.createElement('input');
            document.body.appendChild(inputEle);
            inputEle.setAttribute('value', String(val));
            inputEle.setAttribute('readonly', 'readonly');
            inputEle.select();
            document.execCommand('copy');
            document.body.removeChild(inputEle);
            message.success(t('action.success', { action: t('copy') }));
        }
        document.designMode = 'off';
    };

    return (
        <>
            <Tooltip title={tip} placement="top">
                <CopyFilled className="copy-btn" {...props} onClick={copyLink} />
            </Tooltip>
            <style jsx>{`
                :global(.copy-btn) {
                    margin-left: 0.5em;
                    color: #36cfc9;
                }
                :global(.copy-btn:hover) {
                    margin-left: 0.5em;
                    color: #13c2c2;
                }
            `}</style>
        </>
    );
}
