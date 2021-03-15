import { useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { get } from '@gui/request';

// eslint-disable-next-line react/prop-types
const CapachaModal = ({ t, visiable, handleOk, loading }: any) => {
    const [captchaImg, setcaptchaImg] = useState();
    const [captcha, setcaptcha] = useState('');
    const [checkFailed, setcheckFailed] = useState(false);

    const fetchImgSrc = () => {
        setcaptcha('');
        get('/api/account/api/user/captcha/').then((res: any = { data: {} }) => {
            if (res) {
                setcaptchaImg(res.image);
            }
        });
    };

    const submitFn = () => {
        handleOk(captcha, () => {
            fetchImgSrc();
            setcheckFailed(true);
        });
    };

    useEffect(() => {
        // 生成图片验证码路径 + 时间戳（刷新验证码）
        if (visiable) {
            fetchImgSrc();
        }
    }, [visiable]);

    const changeVal = ({ target }: any) => {
        setcaptcha(target.value);
        setcheckFailed(false);
    };

    return (
        <Modal
            wrapClassName="footer-center-modal"
            visible={visiable}
            closable={false}
            footer={[
                <Button
                    style={{ display: 'block', margin: '0 auto' }}
                    key="submit"
                    type="primary"
                    loading={loading}
                    disabled={!captcha}
                    onClick={submitFn}
                >
                    {t('common:confirm')}
                </Button>,
            ]}
            maskClosable={false}
        >
            <p>
                <WarningOutlined style={{ color: 'orange', marginRight: 5 }} />
                {t('captcha.tip')}
            </p>
            <div>
                <Input
                    value={captcha}
                    onChange={changeVal}
                    style={{
                        width: '120px',
                        verticalAlign: 'middle',
                        borderColor: checkFailed ? 'red' : '#ddd',
                    }}
                />
                <span style={{ cursor: 'pointer', marginLeft: 10 }} onClick={fetchImgSrc}>
                    <img src={captchaImg} className="mr-3" alt="" />
                    <span className="fz-s c-deep">刷新验证码</span>
                </span>
            </div>
            {checkFailed && <p style={{ color: 'red' }}>{t('captcha.current.input')}</p>}
        </Modal>
    );
};

export default CapachaModal;
