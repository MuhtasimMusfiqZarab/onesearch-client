import React, { FC, useState, useEffect } from 'react';
import { Lock, DownArrow, UnlockIcon } from 'components/_icons';
import { Controller } from './table-controller';
import { Loader, Checkbox } from 'components/general';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

interface Props {
  items?: any[];
  headersEnums: object;
  hasController?: boolean;
  hasCheckbox?: boolean;
  loading?: boolean;
  parentRoute?: string;
  isLocked?: boolean;
  forceLocked?: boolean;
  unlockedItems?: object[];
  idRoute?: string;
  onUnlock?: (value: any) => void;
  clickableRows?: boolean;
  sortable?: boolean;
  sortableKeys?: string[];
  allRowsUnlocked?: boolean;
}

export const Table: FC<Props> = ({
  items = [],
  headersEnums,
  hasController = true,
  hasCheckbox = true,
  loading = false,
  parentRoute,
  isLocked = true,
  forceLocked = false,
  unlockedItems = [],
  idRoute,
  onUnlock,
  clickableRows = false,
  sortable = false,
  sortableKeys,
  allRowsUnlocked = false
}: Props): JSX.Element => {
  const router = useRouter();
  let [toggleBtn, setToggleBtn] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    null
  );

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<(string | number)[]>([]);
  const [rowLockMap, setRowLockMap] = useState<Record<string | number, boolean>>({});

  const [dummyArray, setDummyArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const safeItems = Array.isArray(items) ? items : [];
  const sortedItems = sortConfig
    ? [...safeItems].sort((left, right) => {
        const leftValue = left?.[sortConfig.key];
        const rightValue = right?.[sortConfig.key];
        let comparison = 0;

        if (leftValue === null || leftValue === undefined || leftValue === '') {
          comparison =
            rightValue === null || rightValue === undefined || rightValue === '' ? 0 : -1;
        } else if (rightValue === null || rightValue === undefined || rightValue === '') {
          comparison = 1;
        } else if (sortConfig.key === 'createdAt') {
          comparison = new Date(leftValue).getTime() - new Date(rightValue).getTime();
        } else if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          comparison = leftValue - rightValue;
        } else {
          comparison = String(leftValue).localeCompare(String(rightValue), undefined, {
            numeric: true,
            sensitivity: 'base'
          });
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
      })
    : safeItems;

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  useEffect(() => {
    if (forceLocked) {
      setRowLockMap({});
      return;
    }

    setRowLockMap((prev) => {
      const next = { ...prev };

      safeItems.forEach((item) => {
        const itemId = item?.id;
        if (itemId === undefined || itemId === null) return;
        if (!(String(itemId) in next)) {
          next[String(itemId)] = false;
        }
      });

      return next;
    });
  }, [safeItems, forceLocked]);

  const isRowUnlocked = (item: any): boolean => {
    if (allRowsUnlocked) return Boolean(item);
    if (!item || (!isLocked && !forceLocked)) return false;

    const rowId = item?.id;
    if (rowId === undefined || rowId === null) return false;

    const isUserUnlocked = unlockedItems.some((value: any) => value?.id === rowId);
    return isUserUnlocked || Boolean(rowLockMap[String(rowId)]);
  };

  const handleSelectAll = (e) => {
    const nextState = !isCheckAll;
    setIsCheckAll(nextState);

    if (nextState) {
      const selectableRows = safeItems.filter((item) => isRowUnlocked(item));
      setIsCheck(selectableRows.map((item) => item.id));
      return;
    }

    setIsCheck([]);
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    const itemId = id;
    const item = safeItems.find((entry) => entry?.id === itemId);

    if (!item || !isRowUnlocked(item)) {
      return;
    }

    if (checked) {
      setIsCheck((prev) => [...prev, itemId]);
      return;
    }

    setIsCheck((prev) => prev.filter((entry) => entry !== itemId));
  };

  const handleToggleBtn = () => {
    setToggleBtn((toggleBtn = !toggleBtn));
  };

  const getDisplayValue = (key: string, value: any) => {
    if (value === null || value === undefined || value === '') return '-';

    if (key === 'createdAt') {
      const dateValue = new Date(value);
      if (!Number.isNaN(dateValue.getTime())) {
        return dateValue.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }
    }

    if (key === 'id' && typeof value === 'string') {
      return value.slice(-11);
    }

    return value;
  };

  const handleDownloadSelected = () => {
    if (!isCheck.length) {
      return;
    }

    const selectedItems = safeItems.filter((item) => isCheck.includes(item?.id));
    const headerKeys = Object.keys(headersEnums);

    const headerRow = headerKeys.map((key) => `"${String(headersEnums[key]).replace(/"/g, '""')}"`);
    const dataRows = selectedItems.map((item) =>
      headerKeys
        .map((key) => {
          const value = getDisplayValue(key, item[key] ?? '');
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(',')
    );

    const csvContent = [headerRow.join(','), ...dataRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'selected-channels.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  //only while loading
  const renderLoader = (total: number) => {
    return dummyArray.map((item, index) => {
      return (
        <tr key={index} className={`${styles.tr}`}>
          {hasCheckbox && (
            <td className={`${styles.td}`}>
              <Loader isActionButton />
            </td>
          )}
          {Object.keys(headersEnums).map((key) => (
            <td key={key} className={styles.td}>
              <Loader isTextBox />
            </td>
          ))}
          <td className={styles.td}>
            <span className={styles.save_btn}>
              <Loader isActionButton />
            </span>

            <span onClick={handleToggleBtn} className={styles.toggle_btn}>
              {toggleBtn ? 'Show less' : 'Expand'}
              <DownArrow />
            </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {hasController && hasCheckbox && (
        <Controller
          hasCheckbox={hasCheckbox}
          onDownload={handleDownloadSelected}
          selectedCount={isCheck.length}
        />
      )}
      <div className={styles.table_wrap}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              {hasCheckbox && (
                <th className={styles.th}>
                  <input
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    onChange={handleSelectAll}
                    checked={isCheckAll}
                  />
                  {/* <Checkbox /> */}
                </th>
              )}

              {Object.keys(headersEnums).map((key) => (
                <th key={key} className={styles.th}>
                  {sortable && (!sortableKeys || sortableKeys.includes(key)) ? (
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => handleSort(key)}
                      aria-label={`Sort by ${headersEnums[key]} ${sortConfig?.key === key && sortConfig.direction === 'asc' ? 'descending' : 'ascending'}`}
                      aria-sort={
                        sortConfig?.key === key
                          ? sortConfig.direction === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                      }>
                      {headersEnums[key]}
                      <span aria-hidden="true">
                        {sortConfig?.key === key
                          ? sortConfig.direction === 'asc'
                            ? ' ▲'
                            : ' ▼'
                          : ' ↕'}
                      </span>
                    </button>
                  ) : (
                    headersEnums[key]
                  )}
                </th>
              ))}
              {(isLocked || hasCheckbox) && (
                <th className={styles.th}>
                  {isLocked ? (
                    <div>
                      <Lock color="#ffffff" />
                      <span></span>
                    </div>
                  ) : (
                    <span></span>
                  )}
                </th>
              )}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {!loading &&
              sortedItems.map((item, index) => {
                const rowIsUnlocked = isRowUnlocked(item);

                return (
                  <tr
                    key={index}
                    className={`${styles.tr} ${toggleBtn ? styles.expand : ''} ${
                      isCheck.includes(item.id) ? styles.active_row : ''
                    }`}
                    onClick={() => {
                      if (clickableRows && rowIsUnlocked && parentRoute) {
                        router.push(`${parentRoute}/${encodeURIComponent(String(item.id))}`);
                      }
                    }}
                    style={clickableRows && rowIsUnlocked ? { cursor: 'pointer' } : undefined}>
                    {hasCheckbox && (
                      <td className={styles.td}>
                        <input
                          type="checkbox"
                          id={item.id}
                          onChange={handleClick}
                          onClick={(event) => event.stopPropagation()}
                          disabled={!rowIsUnlocked}
                          checked={isCheck.includes(item.id)}
                        />
                      </td>
                    )}
                    {Object.keys(headersEnums).map((key) => {
                      const value = getDisplayValue(key, item[key]);
                      const isRequestIdCell = key === 'id';

                      return (
                        <td key={key} className={styles.td}>
                          <div className={styles.tr_info}>{headersEnums[key]}</div>
                          {isRequestIdCell ? (
                            idRoute ? (
                              <Link href={`${idRoute}/${encodeURIComponent(String(item.id))}`}>
                                <a className={styles.request_id_link}>{value}</a>
                              </Link>
                            ) : (
                              <a
                                href="#"
                                className={styles.request_id_link}
                                onClick={(event) => event.preventDefault()}>
                                {value}
                              </a>
                            )
                          ) : rowIsUnlocked && parentRoute ? (
                            <Link href={`${parentRoute}/${item.id}`}>
                              <a>{value}</a>
                            </Link>
                          ) : (
                            <span>{value}</span>
                          )}
                        </td>
                      );
                    })}
                    {(isLocked || hasCheckbox) && (
                      <td className={styles.td}>
                        {isLocked && (
                          <span
                            className={styles.save_btn}
                            title={
                              forceLocked
                                ? 'You need to login to access the detailed data.'
                                : undefined
                            }
                            data-tooltip={
                              forceLocked
                                ? 'You need to login to access the detailed data.'
                                : undefined
                            }
                            onClick={(event) => {
                              event.stopPropagation();
                              if (forceLocked || !rowIsUnlocked || !onUnlock) return;
                              onUnlock(item.id);
                            }}
                            aria-label={
                              forceLocked
                                ? 'Login required'
                                : rowIsUnlocked
                                ? 'Already unlocked'
                                : 'Unlock row'
                            }>
                            {rowIsUnlocked ? (
                              <UnlockIcon color="#10b981" />
                            ) : (
                              <Lock color="#f59e0b" />
                            )}
                          </span>
                        )}

                        <span
                          onClick={(event) => {
                            event.stopPropagation();
                            handleToggleBtn();
                          }}
                          className={styles.toggle_btn}>
                          {toggleBtn ? 'Show less' : 'Expand'}
                          <DownArrow />
                        </span>
                      </td>
                    )}
                  </tr>
                );
              })}
            {loading && renderLoader(10)}
          </tbody>
        </table>
      </div>
    </>
  );
};
