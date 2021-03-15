import { useState, useEffect } from 'react';
import { post } from '@gui/request';
import { Form, Input, Button } from 'antd';
import has from 'lodash/has';
import CaptchaModal from './CaptchaModal';

export default function CaptchaItem(captchaProps) {
    const { t, form, ...inputProps } = captchaProps;
    let counter;
    let num = 60;

    const [queryingCode, setqueryingCode] = useState(false);
    const [count, setcount] = useState(0);
    const [captchaModalVisible, setcaptchaModalVisible] = useState(false);
    const [queryingCaptcha, setqueryingCaptcha] = useState(false);

    const setError = (values, key, msg) => {
        if (key) {
            form.setFields({
                [key]: {
                    value: values[key],
                    errors: [new Error(msg)],
                },
            });
        }
    };

    const queryCaptcha = (params, callBackFn?, errorCallbackFn?) => {
        setqueryingCode(true);
        post('/opene/system/user_profile/smscode/', params)
            .then(() => {
                setcount(num);
                counter = setInterval(() => {
                    num -= 1;
                    setcount(num);
                    if (num < 0) {
                        clearInterval(counter);
                        num = 60;
                    }
                }, 1000);
                callBackFn?.();
            })
            .catch((error) => errorCallbackFn?.(error))
            .finally(() => setqueryingCode(false));
    };

    const sendVerificationCode = () => {
        form.validateFields(['phone', 'nation_code']).then((values) => {
            queryCaptcha(
                {
                    nation_code: values.nation_code.split('_')[0].slice(1),
                    phone: values.phone,
                    type: 'registration',
                },
                () => {
                    return null;
                },
                (error) => {
                    if (error.response && error.response.data) {
                        // code === need_captcha, 发送手机验证码需要进行图片验证码进行验证
                        if (error.response.data.code === 'need_captcha') {
                            setcaptchaModalVisible(true);
                        } else {
                            // 改手机号已存在
                            // eslint-disable-next-line no-lonely-if
                            if (has(error.response.data.result, 'phone')) {
                                setError(
                                    values,
                                    'phone',
                                    t('formItem.existed', { name: t('phone.number') })
                                );
                            }
                        }
                    }
                }
            );
        });
    };

    const handleCaptchaCallback = (captcha, resetField) => {
        const values = form.getFieldsValue();
        setqueryingCaptcha(true);
        // 获取手机验证码 （captcha-图片验证码字段必传）
        queryCaptcha(
            {
                nation_code: '+86',
                phone: values.phone,
                type: 'registration',
                captcha,
            },
            () => {
                // 图片验证码校验成功
                setqueryingCaptcha(false);
                setcaptchaModalVisible(false);
            },
            (error: any) => {
                // 图片验证码校验失败
                setqueryingCaptcha(false);
                if (error.response && error.response.data) {
                    if (error.response.data.code === 'need_captcha') {
                        resetField();
                    } else {
                        setcaptchaModalVisible(false);
                        // eslint-disable-next-line no-lonely-if
                        if (has(error.response.data.result, 'phone')) {
                            setError(
                                values,
                                'phone',
                                t('formItem.existed', { name: t('phone.number') })
                            );
                        }
                    }
                }
            }
        );
    };

    useEffect(() => {
        return () => {
            if (counter) clearInterval(counter);
        };
    }, []);

    return (
        <div className="wrapper">
            <Form.Item name="captcha" noStyle>
                <Input
                    className="lg-input captcha-input"
                    autoComplete="new-password"
                    bordered={false}
                    {...inputProps}
                />
            </Form.Item>
            <Button
                disabled={queryingCode || count > 0}
                type="primary"
                className="send-btn"
                onClick={sendVerificationCode}
            >
                {count > 0
                    ? t('verificationCode.reSend', { second: count })
                    : t('verificationCode.send')}
            </Button>

            <CaptchaModal
                t={t}
                handleOk={handleCaptchaCallback}
                visiable={captchaModalVisible}
                loading={queryingCaptcha}
            />
            <style jsx>{`
                .wrapper {
                    position: relative;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                }
                :global(.send-btn) {
                    margin-left: 1em;
                    width: 5em;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}
