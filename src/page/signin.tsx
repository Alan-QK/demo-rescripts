import { useState } from 'react';
import { useHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import store from '@store';
import { withTranslation } from '@i18n';

import HomeWrapper from '@components/Layout/HomeWrapper';
import HomeForm, { HandleError } from '@components/home/HomeForm';

import { ApiAccount } from '../services/account';
import { message } from 'antd';

const LoginComp = ({ t }) => {
    const history = useHistory();
    const [logining, setlogining] = useState(false);
    const [errorVals, setErrorVals] = useState<any>({});
    const errTip = {
        username: t('invalid.username'),
        password: t('invalid.password'),
    };

    const handleSubmit = async (values) => {
        store('_user_id', null);
        setErrorVals({});
        setlogining(true);

        try {
            await ApiAccount.SignIn(values);
            history.replace('/');
        } catch (error) {
            if (!isEmpty(error?.response?.data?.result)) {
                setErrorVals(HandleError(error?.response?.data?.result, values, errTip));
            } else {
                message.error(t('signinFailed') + (error?.response?.data?.msg ?? ''));
            }
        }

        setlogining(false);
    };

    const items = [
        {
            key: 'username',
            label: t('username'),
            rules: [{ required: true, message: t('inputTip', { name: t('username') }) }],
            prefix: <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />,
            // placeholder: t('inputTip', { name: t('refunter.username') }),
        },
        {
            key: 'password',
            type: 'password',
            label: t('password.title'),
            rules: [{ required: true, message: t('inputTip', { name: t('password.title') }) }],
            prefix: <LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />,
        },
    ];
    return (
        <HomeWrapper title={t('label.signin')}>
            <HomeForm
                items={items}
                onOk={handleSubmit}
                okBtnText={t('signin')}
                loading={logining}
                errors={errorVals}
            />
        </HomeWrapper>
    );
};

export default withTranslation(['i18n_home', 'common'])(LoginComp);
