//Loadable插件需使用Loading
import Loadable from 'react-loadable';
import Loading from 'components/Loading/index';

const loader = (comp) => {
    return Loadable({
        loader: comp,
        loading: Loading,
    });
};

export const Menus = [
    {
        title: '首页',
        key: 'home',
        icon: 'page',
        href: '/',
        comp: loader(() => import('page/index')),
    },
    {
        title: '登录',
        key: 'signup',
        icon: 'page',
        href: '/signin',
        comp: loader(() => import('page/signin')),
        noLayout: true,
    },
];
