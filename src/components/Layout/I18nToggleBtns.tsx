import { useContext } from 'react';
import { Select } from 'antd';
import { LangCtx } from '@lib/index';
export default function I18nToggleBtns() {
    const { lang } = useContext(LangCtx);
    const { toggleLang } = useContext(LangCtx);
    return (
        <>
            <Select
                bordered={false}
                size="small"
                value={lang}
                className="i18n-select"
                onChange={(val) => toggleLang(val)}
                style={{ width: '5em', color: '#fff', padding: 0 }}
                dropdownStyle={{ padding: 0 }}
                dropdownMatchSelectWidth={80}
            >
                <Select.Option value="en">
                    <span className="fz-s">English</span>
                </Select.Option>
                <Select.Option value="zh">
                    <span className="fz-s">简体中文</span>
                </Select.Option>
            </Select>
            <style jsx>{`
                .fz-s {
                    font-size: 12px;
                }
                :global(.i18n-select .ant-select-arrow) {
                    color: #fff;
                    display: none;
                }
                :global(.i18n-select .ant-select-selection-item) {
                    padding: 0 !important;
                }
            `}</style>
        </>
    );
}

export const Logo = () => {
    return <img style={{ width: '100px' }} src={`/static/images/logo.png`} alt="" />;
};
