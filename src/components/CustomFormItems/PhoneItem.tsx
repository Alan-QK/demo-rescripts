import { useContext } from 'react';
import { LangCtx } from '@lib/index';
import { Form, Input, Select } from 'antd';
import AREANO_LIST from '@lib/areanoList';
import '@assets/css/flags.css';

const prefixSelector = (lang) => {
    const initialVal = lang === 'zh' ? '+86_100042' : '+1_100188';
    return (
        <>
            <Form.Item name="nation_code" noStyle initialValue={initialVal}>
                <Select
                    bordered={false}
                    showSearch
                    dropdownClassName="phone-pre"
                    style={{ width: '7em', paddingLeft: 0, paddingRight: 0 }}
                    dropdownMatchSelectWidth={170}
                    optionLabelProp="label"
                    maxTagTextLength={200}
                    filterOption={(input, option: any) =>
                        option['data-label'].toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {AREANO_LIST?.map((item) => (
                        <Select.Option
                            key={`${item.code}_${item.id}`}
                            label={
                                <span className="fz-s label">
                                    <span
                                        className={`flag flag-${item.ab?.toLocaleLowerCase()}`}
                                    ></span>
                                    {item.code}
                                </span>
                            }
                            value={`${item.code}_${item.id}`}
                            data-label={`${item[lang === 'zh' ? 'cn' : 'en']}${item.code}`}
                        >
                            <span className={`flag flag-${item.ab?.toLocaleLowerCase()}`}></span>
                            <span className="name">{item[lang === 'zh' ? 'cn' : 'en']}</span>
                            <span className="code">{item.code}</span>
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <style jsx>{`
                .flag {
                    margin-right: 5px;
                    vertical-align: middle;
                }
                .name {
                    display: inline-block;
                    color: #666;
                    font-size: 0.8em;
                    width: calc(100% - 5em);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: middle;
                }
                .label {
                    display: flex;
                    align-items: center;
                }
                .code {
                    float: right;
                    color: #999;
                    font-size: 0.8em;
                    line-height: 2.2em;
                }
            `}</style>
        </>
    );
};
export default function PhoneItem(phoneProps) {
    const { prefix, key, rules, ...otherProps } = phoneProps;
    const { lang } = useContext(LangCtx);

    return (
        <div className="wrapper">
            <span className="f-l">{prefix}</span>
            <span className="f-l selector">{prefixSelector(lang)}</span>
            <Form.Item name={key} rules={rules} noStyle>
                <Input
                    className="lg-input phone-input"
                    autoComplete="new-password"
                    bordered={false}
                    {...otherProps}
                />
            </Form.Item>

            <style jsx>{`
                .wrapper {
                    position: relative;
                }
                .f-l {
                    position: absolute;
                    top: 50%;
                    left: 11px;
                    transform: translateY(-50%);
                    line-height: 2em;
                    z-index: 1;
                }
                :global(.phone-input) {
                    padding-left: 7em;
                }
                .selector {
                    left: 0;
                }
            `}</style>
        </div>
    );
}
