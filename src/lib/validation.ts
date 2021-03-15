export const PwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;

export const PwdValidator = (t) => [
    () => ({
        validator(_, value) {
            if (!value) {
                return Promise.reject(t('inputTip', { name: t('common:password') }));
            } else if (value.length < 8) {
                return Promise.reject(t('inputTip.pwd.min', { min: 8 }));
            } else if (!PwdReg.test(value)) {
                return Promise.reject(t('invalid.pwd.tip'));
            } else {
                return Promise.resolve();
            }
        },
    }),
];
