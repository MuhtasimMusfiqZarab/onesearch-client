import React, { FC, useState, useEffect } from 'react';
import { Lock, DownArrow, UnlockIcon } from 'components/_icons';
import { Controller } from './table-controller';
import { Loader, Checkbox } from 'components/general';
import Link from 'next/link';

import styles from './styles.module.scss';

interface Props {
  items: any[];
  headersEnums: object;
  hasController?: boolean;
  hasCheckbox?: boolean;
  loading?: boolean;
  parentRoute?: string;
  isLocked?: boolean;
  unlockedItems?: object[];
  onUnlock?: (value: any) => void;
}

export const Table: FC<Props> = ({
  items,
  headersEnums,
  hasController = true,
  hasCheckbox = true,
  loading = false,
  parentRoute,
  isLocked = true,
  unlockedItems = [],
  onUnlock
}: Props): JSX.Element => {
  let [toggleBtn, setToggleBtn] = useState(false);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<(string | number)[]>([]);
  const [rowLockMap, setRowLockMap] = useState<Record<string | number, boolean>>({});

  const [dummyArray, setDummyArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    setRowLockMap((prev) => {
      const next = { ...prev };

      items.forEach((item) => {
        if (item?.id === undefined || item?.id === null) return;
        if (!(item.id in next)) {
          next[item.id] = Math.random() < 0.5;
        }
      });

      return next;
    });
  }, [items]);

  const isRowUnlocked = (item: any): boolean => {
    if (!isLocked) return false;

    const isUserUnlocked = unlockedItems.some((value: any) => value.id === item.id);
    return isUserUnlocked || Boolean(rowLockMap[item.id]);
  };

  const handleSelectAll = (e) => {
    const nextState = !isCheckAll;
    setIsCheckAll(nextState);

    if (nextState) {
      const selectableRows = items.filter((item) => isRowUnlocked(item));
      setIsCheck(selectableRows.map((item) => item.id));
      return;
    }

    setIsCheck([]);
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    const itemId = id;
    const item = items.find((entry) => entry.id === itemId);

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

  const handleDownloadSelected = () => {
    if (!isCheck.length) {
      return;
    }

    const selectedItems = items.filter((item) => isCheck.includes(item.id));
    const headerKeys = Object.keys(headersEnums);

    const headerRow = headerKeys.map((key) => `"${String(headersEnums[key]).replace(/"/g, '""')}"`);
    const dataRows = selectedItems.map((item) =>
      headerKeys
        .map((key) => {
          const value = item[key] ?? '';
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
                  {headersEnums[key]}
                </th>
              ))}
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
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {!loading &&
              items.map((item, index) => {
                const rowIsUnlocked = isRowUnlocked(item);

                return (
                  <tr
                    key={index}
                    className={`${styles.tr} ${toggleBtn ? styles.expand : ''} ${
                      isCheck.includes(item.id) ? styles.active_row : ''
                    }`}>
                    {hasCheckbox && (
                      <td className={styles.td}>
                        <input
                          type="checkbox"
                          id={item.id}
                          onChange={handleClick}
                          disabled={!rowIsUnlocked}
                          checked={isCheck.includes(item.id)}
                        />
                      </td>
                    )}
                    {Object.keys(headersEnums).map((key) => {
                      const value = item[key] ?? '-';

                      return (
                        <td key={key} className={styles.td}>
                          <div className={styles.tr_info}>{headersEnums[key]}</div>
                          {rowIsUnlocked && parentRoute ? (
                            <Link href={`${parentRoute}/${item.id}`}>
                              <a>{value}</a>
                            </Link>
                          ) : (
                            <span>{value}</span>
                          )}
                        </td>
                      );
                    })}
                    <td className={styles.td}>
                      {isLocked && (
                        <span
                          className={styles.save_btn}
                          onClick={(event) => {
                            event.stopPropagation();
                            if (onUnlock) {
                              onUnlock(item.id);
                            }
                          }}>
                          {rowIsUnlocked ? (
                            <UnlockIcon color="#10b981" />
                          ) : (
                            <Lock color="#f59e0b" />
                          )}
                        </span>
                      )}

                      <span onClick={handleToggleBtn} className={styles.toggle_btn}>
                        {toggleBtn ? 'Show less' : 'Expand'}
                        <DownArrow />
                      </span>
                    </td>
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
