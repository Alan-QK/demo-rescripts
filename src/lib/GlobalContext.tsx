import { createContext, useReducer } from 'react';
import { wrapperDispatch } from './index';
// import { useTranslation } from '@i18n';

interface StateProps {
    dynamicTask?;
    t?;
}

const initState: any = {
    dynamicTask: [],
};

const reducerFn = (state, action?) => {
    const [type, payload] = action || [];
    switch (type) {
        case 'generateTask':
            state.dynamicTask.push(payload);
            return { ...state, dynamicTask: state.dynamicTask };
        case 'removeTask':
            if (!payload) {
                return { ...state, dynamicTask: [] };
            }
            state.dynamicTask = state.dynamicTask.filter((i) => {
                return !(i.name === payload?.name && i.id === payload?.id);
            });
            return { ...state, dynamicTask: state.dynamicTask };
        case 'init':
            return { ...initState, dynamicTask: [] };
        default:
            return { ...state };
    }
};

const GlobalContext = createContext({} as StateProps & { globalDispatch });

export function GlobalContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducerFn, initState);
    return (
        <GlobalContext.Provider value={{ ...state, globalDispatch: wrapperDispatch(dispatch) }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;
