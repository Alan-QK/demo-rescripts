export { default as I18nApp, LangCtx } from './I18nApp';
export { default as AdminContext, AdminContextProvider } from './AdminContext';
export { default as GlobalContext, GlobalContextProvider } from './GlobalContext';

// global-state-context -- start
function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function'
    );
}

export function wrapperDispatch(dispatch) {
    return (action) => {
        if (isPromise(action.payload)) {
            action.payload.then((v) => {
                dispatch({ type: action.type, payload: v });
            });
        } else {
            dispatch(action);
        }
    };
}
