/**
 * 该组件主要由两部分组成
 * 1、过滤筛选组件
 * 2、table组件（自定义的AysncTable）
 *
 * action: 适用于页面结构比较统一的场景
 * 方便实现表格自适应等通用功能
 * 该组件不涉及业务逻辑，业务逻辑的处理应在父组件完成
 * 如父组件需要调用该组件的部分state，比如columns/searchParams等， 可以在本组件内部将该变量共享出去
 */
import { useState, useEffect, useContext, useImperativeHandle } from 'react';
import useRouter from 'utils/useRouter';

import FilterGroup, { FilterGroupProps } from './FilterGroup';
import AysncTable, { AysncTableProps } from '@components/common/AysncTable';
import { VList } from './virtuallist-antd';
import has from 'lodash/has';
import isArray from 'lodash/isArray';
import TableCoumnFilterBtn from './TableCoumnFilterBtn';
import ExportBtn from './ExportBtn';
import { BulbOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import useWindowSize from 'utils/useWindowSize';
import { AdminContext } from '@lib/index';

import { isSame } from 'utils/index';
import { Alert } from 'antd';

function transColumnsIndex(arr) {
    return arr.map((i) => {
        if (isArray(i)) return i.join('.');
        return i;
    });
}

interface OtherFilterProps {
    hideSetting?: boolean;
}

interface Props {
    thisRef?;
    autoSize?: boolean;
    columns;
    tips?;
    receiveTableStateChange?: (v) => void;
    receiveFilterStateChange?: (v) => void;
    filterProps?: FilterGroupProps & OtherFilterProps;
    tableProps: AysncTableProps;
    toggleRefreshTable?;
    extraTableParams?;
    exportBtnProps?;
}

const HigherTableContainer = (props: Props) => {
    const { userInfo, accounts } = useContext(AdminContext);
    const { pathname } = useRouter();
    const winSize = useWindowSize();
    const {
        thisRef,
        columns,
        autoSize,
        tips,
        receiveTableStateChange = (v) => v,
        receiveFilterStateChange = (v) => v,
        filterProps,
        tableProps,
        toggleRefreshTable,
        extraTableParams,
        exportBtnProps,
    } = props;

    const [searchParams, setSearchParams] = useState();
    const [toggleTable, setToggleTable] = useState(false);
    const [offsetTop, setOffsetTop] = useState(250); // table距顶部的高度
    const [tableColumns, setTableColumns] = useState<Array<any>>();

    function updateTableColumns(arr, selected) {
        const nextTableColumns = arr
            ?.filter((i) =>
                transColumnsIndex(selected).includes(
                    isArray(i.dataIndex) ? i.dataIndex.join('.') : i.dataIndex
                )
            )
            ?.map((c) => ({
                ...c,
                dataIndex: c.dataIndex.includes('.') ? c.dataIndex.split('.') : c.dataIndex,
                ellipsis: true,
                width: c.width ?? 140,
            }));

        if (autoSize) {
            setTableColumns([...nextTableColumns, { title: '', dataIndex: 'HIDDEN' }]);
        } else {
            setTableColumns(nextTableColumns);
        }
    }

    useEffect(() => {
        setToggleTable(!toggleTable);
    }, [toggleRefreshTable]);

    function updateColumns(nextColumns) {
        // if (isSame(columns.map(i => i.dataIndex), nextColumns)) return;
        // console.log({ columns, nextColumns })
        updateTableColumns(columns, nextColumns);
    }

    // 暴露给父组件的接口
    useImperativeHandle(thisRef, () => ({
        getQuerys: () => searchParams,
    }));

    return (
        <>
            <FilterGroup
                {...filterProps}
                defaultVal={extraTableParams}
                refreshCallback={() => setToggleTable(!toggleTable)}
                extra2Actions={[
                    !filterProps?.hideSetting && !!columns && !!userInfo?.username && (
                        <span className="mr-3" key="TableCoumnFilterBtn">
                            <TableCoumnFilterBtn
                                uniqueId={`${pathname}-table-columns-${userInfo?.username}`}
                                columns={columns.filter(
                                    (col) =>
                                        !(
                                            col.dataIndex === 'account_id' &&
                                            userInfo.role === 'common'
                                        )
                                )}
                                callbackFn={updateColumns}
                            />
                        </span>
                    ),
                    !!exportBtnProps && (
                        <span key="__export__btn" className="mr-3">
                            <ExportBtn {...exportBtnProps} />
                        </span>
                    ),
                    ...(filterProps?.extra2Actions || []),
                ].filter((i) => !!i)}
                callbackFn={(vals, compHeight) => {
                    receiveFilterStateChange(vals);
                    if (!isSame(vals, searchParams)) {
                        setSearchParams({ ...vals });
                    }

                    setOffsetTop(225 + compHeight);
                }}
            />
            {tips && (
                <div className="tip flex-box">
                    <BulbOutlined className="c-warn mr-2" style={{ marginTop: 5 }} />
                    <span>{tips}</span>
                </div>
            )}
            {!!tableColumns?.length && (
                <AysncTable
                    {...tableProps}
                    toggleRefresh={toggleTable}
                    params={
                        extraTableParams
                            ? { ...extraTableParams, ...(searchParams || {}) }
                            : searchParams
                    }
                    callbackFn={receiveTableStateChange}
                    confs={{
                        ...tableProps.confs,
                        columns: tableColumns.map((col) =>
                            col.dataIndex === 'account_id'
                                ? {
                                      ...col,
                                      render: (v, r) => r.account_name ?? v,
                                      filters: accounts?.map((i) => ({
                                          text: i.name,
                                          value: i.id,
                                      })),
                                  }
                                : col
                        ),
                        scroll: {
                            x: has(tableProps?.confs?.scroll, 'x')
                                ? tableProps?.confs?.scroll?.x
                                : 'max-content',
                            y: has(tableProps?.confs?.scroll, 'y')
                                ? tableProps?.confs?.scroll.y
                                : winSize.h - offsetTop,
                        },
                        components: tableProps.confs?.expandable
                            ? null
                            : VList({ height: winSize.h - offsetTop }),
                    }}
                />
            )}

            {!tableColumns?.length && (
                <Alert
                    message={
                        <div className="t-tip">
                            <ExclamationCircleOutlined className="c-warn t-icon" />
                            <span>请先选择表格需要展示的列项。</span>
                        </div>
                    }
                    type="info"
                />
            )}

            <style jsx>{`
                .t-tip {
                    display: flex;
                    flex-flow: column nowrap;
                    align-item: center;
                    text-align: center;
                    padding: 5em 0;
                }
                :global(.t-icon) {
                    margin-bottom: 10px;
                    font-size: 4em;
                }
                .tip.flex-box {
                    margin-bottom: 1em;
                    line-height: 1.8em;
                    display: flex;
                    flex-flow: row nowrap;
                }
            `}</style>
        </>
    );
};

export default HigherTableContainer;
