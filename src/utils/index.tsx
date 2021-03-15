import { message } from 'antd';

import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import omitBy from 'lodash/omitBy';
import difference from 'lodash/difference';
import isArray from 'lodash/isArray';

import moment from 'moment';

export const handleError = (error, isDeep = false, otherStr = '') => {
    if (isDeep && error?.response?.data?.result?.msg) {
        message.error(`${otherStr}${error?.response?.data?.result?.msg}`);
        return;
    }
    if (error?.response?.data?.msg) {
        message.error(`${otherStr}${error?.response?.data?.msg ?? ''}`);
        return;
    }
};

// 使用 , 自动分割数字
export function splitByDot(num) {
    const tNum: string = typeof num === 'number' ? num.toString() : num;

    return (tNum || '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 对y坐标轴的max进行处理
// 12 ==> 15
// 410 ==> 450
// 471 ==> 500
// ....
export function ceilMax(num) {
    if (num <= 10) return 10;
    const numL = Math.ceil(num).toString().length;
    const oNum = Math.round(num / Math.pow(10, numL - 1)) * Math.pow(10, numL - 1);

    return oNum > num ? oNum : oNum + 0.5 * Math.pow(10, numL - 1);
}

// 将字符串转化为数组集合，回车符/逗号作为该长字符串的分割点
export function transStrToArr(str = '') {
    return str
        .trim()
        .replace(/(\r\n)|(\n)/g, ',')
        .replace(/,,/g, ',')
        .split(',');
}

// 过滤table表头的筛选条件
export function getTableHeadParams(params) {
    return Object.keys(params)
        .filter(
            (k) =>
                !(
                    isUndefined(params[k]) ||
                    isNull(params[k]) ||
                    params[k] === '' ||
                    ['limit', 'index'].includes(k)
                )
        )
        .reduce((o, k) => {
            return { ...o, [k]: params[k] };
        }, {});
}

export function isDifferent(arr1, arr2) {
    return (
        typeof arr1 !== typeof arr2 ||
        arr1?.length !== arr2?.length ||
        !!difference(arr1, arr2).length
    );
}

// 比较a b 是否相等
export function getType(P) {
    return Object.prototype.toString.call(P).slice(8, -1).toLocaleLowerCase();
}
function compareObjectAndArray(a, b, type) {
    let aChildren;
    let bChildren;
    if (type === 'array') {
        aChildren = a.sort();
        bChildren = b.sort();
    } else {
        aChildren = Object.keys(a).sort();
        bChildren = Object.keys(b).sort();
    }

    if (aChildren.length !== bChildren.length || difference(aChildren, bChildren).length) {
        return false;
    } else {
        for (let i = 0; i < aChildren.length; i++) {
            const aItem = aChildren[i];
            const bItem = bChildren[i];

            if (!isSame(a[aItem], b[bItem])) {
                return false;
            }
        }
    }

    return true;
}

export function isSame(a, b) {
    const typeA = getType(a);
    const typeB = getType(b);

    if (typeA !== typeB) return false;

    switch (typeA) {
        case 'NaN':
            return isNaN(a) && isNaN(b);
        case 'function':
            break;
        case 'object':
        case 'array':
            return compareObjectAndArray(a, b, typeA);
        default:
            return a === b;
    }
}

export function omitObj(obj) {
    return omitBy(obj, (v) => isNull(v) || isUndefined(v));
}

export function formatTime(time, format?) {
    if (!time) return '';
    return moment(time).format(format || 'YYYY-MM-DD HH:mm:ss');
}

export const getVal = (obj, key) => {
    if (!obj) return null;
    if (isArray(key)) {
        if (key?.length > 1) {
            return getVal(obj[key[0]], key[1]);
        } else {
            return obj[key[0]];
        }
    }
    return obj[key];
};

export const getDeepVal = (obj, key) => {
    if (!obj) return null;
    if (isArray(key)) {
        if (key?.length > 1) {
            return getVal(obj[key[0]], key.slice(1));
        } else {
            return obj[key[0]];
        }
    }
    return obj[key];
};
