//引入路由
import { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { Menus } from '../../router/config';
import Wrapper from '@components/Layout';
import { AdminContextProvider } from '@lib/index';

const noLayoutPages = ['/signin'];

const ContentMain = (): any => {
    const history = useLocation();
    const [noLayout, setNoLayout] = useState(false);

    useEffect(() => {
        setNoLayout(noLayoutPages.includes(history?.pathname));
    }, [history]);

    return (
        <AdminContextProvider>
            <Wrapper noLayout={noLayout}>
                <Switch>
                    {Menus?.map((m: any) => (
                        <Route key={m.key} exact path={m.href} component={m.comp} />
                    ))}
                </Switch>
            </Wrapper>
        </AdminContextProvider>
    );
};

export default ContentMain;
