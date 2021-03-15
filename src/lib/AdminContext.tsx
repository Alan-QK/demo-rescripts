import { createContext, useReducer, useEffect, useContext } from 'react';
import { wrapperDispatch } from './index';
import { Spin } from 'antd';
import { useRequest } from '@gui/request';
import { ApiCompany } from '@services/account';
import { ApiWarehouse } from '@services/warehouse';
// import { useAuth } from 'utils/usePermission';

interface StateProps {
    userInfo?;
    subAccount?;
    accounts?;
    warehouses?;
    loading?;
    loadingTip?;
    isFetchingAccounts?: boolean;
    isFetchingWarehouses?: boolean;
}

const initState: any = {
    userInfo: null,
    subAccount: null,
    accounts: null,
    warehouses: null,
    loading: false,
    isFetchingAccounts: false,
    isFetchingWarehouses: false,
    loadingTip: '',
};

const reducerFn = (state, action?) => {
    const [type, payload = null] = action || [];
    switch (type) {
        case 'toggleGlobalLoading':
            return { ...state, loading: !state.loading, loadingTip: payload };
        case 'setSubAccount':
            return { ...state, subAccount: payload };
        case 'setAccounts':
            return { ...state, accounts: payload };
        case 'setWarehouses':
            return { ...state, warehouses: payload };
        case 'toggleIsFetchingAccounts':
            return { ...state, isFetchingAccount: !state.isFetchingAccounts };
        case 'toggleIsFetchingWarehouses':
            return { ...state, isFetchingAccount: !state.isFetchingWarehouses };
        case 'init':
            return { ...initState };
        default:
            return { ...state };
    }
};

const AdminContext = createContext(initState as StateProps & { dispatch });

const AdminConsume = ({ children }) => {
    const { userInfo, dispatch } = useContext(AdminContext);

    async function fetchAccounts() {
        dispatch(['toggleIsFetchingAccounts']);
        const res = await ApiCompany.List();
        dispatch(['setAccounts', res]);

        dispatch(['toggleIsFetchingAccounts']);
    }

    async function fetchWarehouses() {
        dispatch(['toggleIsFetchingWarehouses']);
        try {
            const res: any = await ApiWarehouse.List();
            console.log({ res });
            dispatch(['setWarehouses', res?.map((i) => ({ ...i, label: `${i.name}(${i.code})` }))]);
        } catch (error) {
            console.error(error);
        }
        dispatch(['toggleIsFetchingWarehouses']);
    }

    useEffect(() => {
        if (userInfo) {
            fetchWarehouses();
            if (userInfo?.is_staff) fetchAccounts();
        }
    }, [userInfo]);

    return children;
};

export function AdminContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducerFn, initState);
    // const { loading, user } = useAuth();
    const { loading, data } = useRequest('/api/user/status/');

    return (
        <AdminContext.Provider
            value={{
                ...state,
                userInfo: data,
                loading: loading || state.loading,
                dispatch: wrapperDispatch(dispatch),
            }}
        >
            {loading && <Spin className="global-spin" />}
            {!loading && !data && <span />}
            {!loading && data && <AdminConsume>{children}</AdminConsume>}
            <style jsx>{`
                :global(.global-spin) {
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </AdminContext.Provider>
    );
}

export default AdminContext;
