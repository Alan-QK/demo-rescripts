import { useState, useEffect, useMemo, createRef, useImperativeHandle } from 'react';

import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import isNumber from 'lodash/isNumber';
import every from 'lodash/every';
import isArray from 'lodash/isArray';
import has from 'lodash/has';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';

import moment, { isMoment } from 'moment';
import { useTranslation } from '@i18n';
import useRouter from 'utils/useRouter';
// import { useHistory } from 'react-router';

import { Form, Button, Select, Tooltip, Row, Col, Drawer, Dropdown, Menu } from 'antd';
import {
    RedoOutlined,
    FilterOutlined,
    SearchOutlined,
    CloseOutlined,
    DoubleRightOutlined,
    QuestionCircleOutlined,
    EllipsisOutlined,
    QuestionCircleFilled,
} from '@ant-design/icons';
import BatchSearchModal from './BatchSearchModal';

import { RenderComp } from '@components/CustomFormItems';

export interface FilterItemProp {
    key: string;
    label: string;
    type?: string;
    keys?;
    multiple?: boolean;
    placeholder?: string;
    moreOptions?;
    options?;
    style?;
    isInRouter?: boolean;
    formatting?;
}

export interface FilterGroupProps {
    myRef?;
    items: Array<FilterItemProp>;
    callbackFn?;
    extraActions?;
    moreActions?;
    extra2Actions?;
    ref?;
    refreshCallback?;
    defaultVal?;
    showSeniorSearch?;
    showBatchSearch?;
    handleVals?;
}

const ResetSymbol = Symbol('reset');

function renderVal(param) {
    const { val, moreOptions, options, type } = param;
    if (options?.length && type === 'select') {
        if (isArray(val)) {
            return val
                .map((item) => options.find((i) => i.value === item)?.label || item)
                .join(',');
        } else {
            return options.find((i) => i.value === val)?.label || val;
        }
    }
    if (isString(val) || isNumber(val)) return val;

    if (isArray(val)) {
        if (every(val, isMoment)) {
            return val.map((v) => v.format(moreOptions?.format || 'YYYY-MM-DD')).join('/');
        } else {
            return val.join('/');
        }
    }

    return '---';
}

function isEmptyValsObj(obj = {}, items) {
    const newObj = Object.keys(obj).reduce((o, k) => {
        if (!!obj[k] || obj[k] === 0) {
            const item = items.find((i) => i.key === k) ?? {};
            return {
                ...o,
                [k]: {
                    val: obj[k],
                    ...item,
                },
            };
        } else return o;
    }, {});

    if (!Object.keys(newObj).length) return false;
    return newObj;
}

// 渲染已有的过滤条件
const FilteredItems = ({ t, params, handleParam }) => {
    return (
        <div className="group">
            <span className="label mr-2">
                <FilterOutlined className="mr-2" />
                {t('filter_conditions')}
                {t('colon')}
            </span>

            {Object.keys(params).map((key) => {
                if (!params[key]?.label) return null;
                return (
                    <span className="tag-item" key={key}>
                        <span onClick={() => handleParam(key)}>
                            {params[key]?.label ?? key}:{' '}
                            <span className="val">{renderVal(params[key])}</span>
                        </span>
                        <CloseOutlined
                            className="item-icon"
                            onClick={() => handleParam(key, true)}
                        />
                    </span>
                );
            })}

            <Button
                size="small"
                className="fz-12"
                type="dashed"
                onClick={() => handleParam(ResetSymbol)}
            >
                {t('reset')}
            </Button>

            <style jsx>{`
                .group {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    background: #eee;
                    color: #999;
                    margin-bottom: 10px;
                    padding: 0.5em;
                    font-size: 12px;
                }

                .tag-item {
                    border: 1px solid #ddd;
                    padding: 2px 5px;
                    background: #fefefe;
                    margin-right: 1em;
                }

                .tag-item:hover {
                    color: #36cfc9;
                }

                :global(.tag-item .item-icon) {
                    cursor: pointer;
                    margin-left: 5px;
                }
                :global(.tag-item .item-icon:hover) {
                    color: red;
                }

                .val {
                    display: inline-block;
                    max-width: 300px;
                    white-space: nowrap;
                    overflow: hidden;
                    vertical-align: bottom;
                    text-overflow: ellipsis;
                }
            `}</style>
        </div>
    );
};

const getFilterParamsFromRouterQuery = (query, keys, isHas = false) => {
    return Object.keys(query).reduce((obj, k) => {
        if (isHas && keys.includes(k)) {
            return { ...obj, [k]: query[k] };
        }
        return obj;
    }, {});
};

const FilterGroup = ({
    myRef,
    items = [],
    callbackFn,
    extraActions,
    moreActions,
    extra2Actions,
    refreshCallback,
    showSeniorSearch,
    handleVals,
    defaultVal = {},
    showBatchSearch,
}: FilterGroupProps) => {
    // const history = useHistory();
    const { t } = useTranslation('common');
    const extraRouterFilterKeys = items.filter((i) => i.isInRouter).map((i) => i.key);
    const thisRef = createRef<HTMLDivElement>();
    const router = useRouter();
    // 初始化过滤条件
    const initialValues = {
        ...defaultVal,
        ...getFilterParamsFromRouterQuery(router.query, extraRouterFilterKeys, true),
    };
    const initVal = Object.keys(initialValues).reduce((obj, key) => {
        if (find(items, ['key', key]) && initialValues[key]) {
            return { ...obj, [key]: initialValues[key] };
        }
        return obj;
    }, {});

    const [form] = Form.useForm();
    const initParam = items[0]?.key;
    const [currentFilter, setCurrentFilter] = useState<string>(initParam);
    const [params, setParams] = useState({ ...initVal });
    const [seniorSearchFormState, setSeniorSearchFormState] = useState(false);
    const [seniorInitVal, setSeniorInitVal] = useState({ ...initVal });
    const [batchSearchModalVisible, setBacthSearchModalVisible] = useState(false);

    useEffect(() => {
        setSeniorInitVal({ ...params });
        let finalParams = Object.assign(params);

        //判别搜索参数中有没有日期数组
        if (
            has(finalParams, 'date') &&
            every(finalParams['date'], isMoment) &&
            finalParams['date']
        ) {
            const filterItem = items.find((item) => item.key === 'date');
            const formatFn = (v) => {
                if (filterItem?.formatting === '--') return moment.parseZone(v).utc(true).format();
                if (filterItem?.formatting) return moment(v).format(filterItem?.formatting);
                return moment(v).format('X');
            };
            finalParams = {
                ...finalParams,
                [filterItem?.keys[0]]: formatFn(finalParams['date'][0]),
                [filterItem?.keys[1]]: formatFn(finalParams['date'][1]),
            };

            delete finalParams.date;
        }

        finalParams = Object.keys(finalParams).reduce((newObj, key) => {
            if (!isString(finalParams[key])) return { ...newObj, [key]: finalParams[key] };
            return { ...newObj, [key]: finalParams[key].trim() };
        }, {});

        let nextParams = Object.assign(finalParams);
        if (handleVals) {
            nextParams = handleVals(finalParams);
        }

        callbackFn?.(nextParams, thisRef.current?.offsetHeight);
    }, [params]);

    // 表单提交
    const submitFn = (values: { [param: string]: any }) => {
        if (isUndefined(values[currentFilter]) || values[currentFilter] === '') return false;
        setParams({ ...params, ...values });
    };

    // 处理搜索记录的点击事件
    // 普通点击 & 删除过滤条件
    const handleParam = (key, isDel) => {
        if (key === ResetSymbol) {
            if (
                extraRouterFilterKeys?.length &&
                !isEmpty(getFilterParamsFromRouterQuery(router.query, extraRouterFilterKeys, true))
            ) {
                // const querys = getFilterParamsFromRouterQuery(router.query, extraRouterFilterKeys);
                // history.replace({ pathname: router.pathname, query: querys });
            }
            setCurrentFilter(initParam);
            form.setFieldsValue({
                [initParam]: undefined,
            });
            setParams({});
            return;
        }

        // setCurrentFilter(key);

        if (isDel) {
            const nextParams = Object.assign(params);
            delete nextParams[key];
            // 删除的为当前搜索条件时重置表单
            form.setFieldsValue({
                [key]: undefined,
            });

            setParams({ ...nextParams });
        } else {
            setCurrentFilter(key);
        }
    };

    const seniorSearch = (isChangedParams, vals) => {
        isChangedParams && setParams(vals);
        setSeniorSearchFormState(false);
    };

    // 批量搜索
    function batchSearch(flag, data) {
        if (flag) {
            setParams({ ...params, ...data });
        }
        setBacthSearchModalVisible(false);
    }

    // 表单元素
    const memoChildTemp = useMemo(() => {
        const currentFormItem = items.find((o) => o.key === currentFilter);
        if (!currentFormItem) return null;

        return (
            <RenderComp
                t={t}
                item={{ ...currentFormItem, style: { ...currentFormItem.style, width: 240 } }}
            />
        );
    }, [currentFilter, items, t]);

    const renderSeniorSearchForm = useMemo(
        () => (
            <SeniorSearchForm
                t={t}
                visible={seniorSearchFormState}
                initialValues={seniorInitVal}
                items={items}
                seniorCallbackFn={seniorSearch}
            />
        ),
        [items, seniorInitVal, seniorSearchFormState]
    );

    const renderFilterItems = useMemo(() => {
        const renderParams = isEmptyValsObj(params, items);
        if (!renderParams) return null;
        return <FilteredItems t={t} params={renderParams} handleParam={handleParam} />;
    }, [params, items, t]);

    const renderMenu = (actions) => {
        const _actions = actions?.filter((i) => i);
        return (
            <Menu>
                {_actions.map((i) => (
                    <Menu.Item key={i.key}>
                        <div className="d-flex j-between align-center">
                            {i.children}
                            {!!i.tips?.length && (
                                <Tooltip
                                    placement="right"
                                    title={
                                        <span className="fz-s d-flex flex-col">
                                            {i.tips?.map((i, idx) => (
                                                <span key={idx}>
                                                    {idx + 1}. {i.cot}
                                                </span>
                                            ))}
                                        </span>
                                    }
                                >
                                    <QuestionCircleFilled className="fz-s c-disable" />
                                </Tooltip>
                            )}
                        </div>
                    </Menu.Item>
                ))}
            </Menu>
        );
    };

    useImperativeHandle(myRef, () => ({
        updateParams: (v) => setParams({ ...params, ...v }),
    }));

    return (
        <div ref={thisRef} className="container">
            <div className="pull-left d-flex align-center">
                {!!items.length && (
                    <Form form={form} onFinish={submitFn} className="search-form mb-3 d-flex">
                        {items.length > 1 && (
                            <Form.Item>
                                <Select
                                    style={{ width: 110, fontSize: 12 }}
                                    defaultValue={items[0].key}
                                    value={currentFilter}
                                    onChange={(val) => setCurrentFilter(val)}
                                    dropdownMatchSelectWidth={140}
                                >
                                    {items?.map((i) => (
                                        <Select.Option key={i.key} value={i.key} className="fz-12">
                                            {i.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        )}
                        {memoChildTemp && (
                            <Form.Item
                                name={currentFilter}
                                className={items!.length > 1 ? 'mult' : ''}
                            >
                                {memoChildTemp}
                            </Form.Item>
                        )}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ padding: '0 0.8em', marginRight: 10 }}
                            >
                                <SearchOutlined />
                            </Button>
                        </Form.Item>
                    </Form>
                )}
                <div className="mb-3 d-flex">
                    {showBatchSearch && (
                        <Button
                            key="batchSearch"
                            className="mr-3 fz-12"
                            onClick={() => setBacthSearchModalVisible(true)}
                        >
                            {t('search.batch')}
                        </Button>
                    )}
                    {extraActions}
                    {!!moreActions?.filter((i) => i)?.length && (
                        <Dropdown overlay={renderMenu(moreActions)} trigger={['click']}>
                            <Button icon={<EllipsisOutlined />} />
                        </Dropdown>
                    )}
                </div>
            </div>

            <div className="pull-right mb-3">
                {refreshCallback && (
                    <Tooltip key="refresh" title={t('refresh')} className="mr-3">
                        <Button
                            className="mr-3"
                            onClick={refreshCallback}
                            icon={<RedoOutlined />}
                        ></Button>
                    </Tooltip>
                )}
                {extra2Actions}
                {showSeniorSearch && (
                    <Button
                        type="link"
                        className="fz-12"
                        onClick={() => {
                            setSeniorSearchFormState(!seniorSearchFormState);
                        }}
                    >
                        {t('search.senior')}
                        <DoubleRightOutlined />
                    </Button>
                )}
            </div>

            {/* 已有的过滤条件 */}
            {renderFilterItems}

            {renderSeniorSearchForm}

            <BatchSearchModal
                t={t}
                visible={batchSearchModalVisible}
                batchCallbackFn={batchSearch}
                params={params}
                filterItems={items.filter((i) => i.multiple)}
            />
            <style jsx>{`
                .container {
                    position: relative;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: space-between;
                    align-items: center;
                }
                .pull-left {
                    flex-flow: row wrap;
                    align-items: center;
                }
                .val {
                    display: inline-block;
                    max-width: 300px;
                }
            `}</style>

            <style jsx global>{`
                .search-form .ant-form-item {
                    margin-bottom: 0;
                }

                .search-form [class^='ant-'] {
                    border-radius: 0 !important;
                }

                .ant-form-item.mult [class^='ant-'] {
                    border-left: none;
                }

                .top-search .ant-btn,
                .top-search .ant-btn .iconfont {
                    font-size: 13px;
                }
                .top-search .ant-btn-icon-only {
                    font-size: 14px;
                }
                .top-search .ant-btn:not(.ant-btn-icon-only) {
                    padding: 0px 10px;
                }
            `}</style>
        </div>
    );
};

export default FilterGroup;

// 高级搜索表单
const SeniorSearchForm = ({ t, initialValues, items, seniorCallbackFn, visible }) => {
    const [form] = Form.useForm();
    const formSubmit = () => {
        const values = form.getFieldsValue();
        seniorCallbackFn(
            true,
            omit(
                values,
                Object.keys(values).filter((k) => isUndefined(values[k]))
            )
        );
    };

    const resetForm = () => {
        form.resetFields();
    };

    const closeCallback = () => {
        seniorCallbackFn(false, {});
    };

    useEffect(() => {
        if (visible) {
            form.setFieldsValue(initialValues);
        }
    }, [visible]);

    return (
        <Drawer
            title={t('search.senior')}
            visible={visible}
            width={560}
            onClose={closeCallback}
            footer={
                <div className="t-right">
                    <Button type="primary" onClick={formSubmit} className="mr-3">
                        {t('search.label')}
                    </Button>
                    <Button onClick={resetForm}>{t('reset')}</Button>
                </div>
            }
        >
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    {items.map((item) => (
                        <Col key={item.key} lg={12} md={12}>
                            <Form.Item
                                name={item.key}
                                label={
                                    <span>
                                        {item.label}
                                        {item.multiple && (
                                            <Tooltip
                                                placement="right"
                                                title={
                                                    <span className="fz-12">
                                                        {t('search.senior-tip')}
                                                    </span>
                                                }
                                            >
                                                <QuestionCircleOutlined className="ml-3 fz-12 c-warn" />
                                            </Tooltip>
                                        )}
                                    </span>
                                }
                            >
                                {
                                    <RenderComp
                                        t={t}
                                        isSeniorForm
                                        item={{ ...item, style: { width: '100%' } }}
                                    />
                                }
                            </Form.Item>
                        </Col>
                    ))}
                </Row>
            </Form>
        </Drawer>
    );
};
