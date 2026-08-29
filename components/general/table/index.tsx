import React, { FC, useState } from 'react';
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

  const [dummyArray, setDummyArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const handleSelectAll = (e) => {
    const nextState = !isCheckAll;
    setIsCheckAll(nextState);

    if (nextState) {
      setIsCheck(items.map((item) => item.id));
      return;
    }

    setIsCheck([]);
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    const itemId = id;

    if (checked) {
      setIsCheck((prev) => [...prev, itemId]);
      return;
    }

    setIsCheck((prev) => prev.filter((item) => item !== itemId));
  };

  const handleToggleBtn = () => {
    setToggleBtn((toggleBtn = !toggleBtn));
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
      {hasController && hasCheckbox && <Controller hasCheckbox={hasCheckbox} />}
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
              items.map((item, index) => (
                <tr
                  key={index}
                  className={`${styles.tr} ${toggleBtn ? styles.expand : ''} ${
                    isCheck.includes(item.id) ? styles.active_row : ''
                  }`}>
                  {hasCheckbox && (
                    <td className={styles.td}>
                      <input
                        type="checkbox"
                        // name={item.channel_name}
                        id={item.id}
                        onChange={handleClick}
                        checked={isCheck.includes(item.id)}
                      />
                    </td>
                  )}
                  {Object.keys(headersEnums).map((key) => (
                    <td key={key} className={styles.td}>
                      <div className={styles.tr_info}>{headersEnums[key]}</div>
                      <Link href={`${parentRoute}/${item.id}`}>
                        <a>{item[key] ?? '-'}</a>
                      </Link>
                    </td>
                  ))}
                  <td className={styles.td}>
                    {isLocked && (
                      <span className={styles.save_btn} onClick={() => onUnlock(item.id)}>
                        {unlockedItems.find((value: any) => value.id === item.id) ? (
                          <UnlockIcon />
                        ) : (
                          <Lock />
                        )}
                      </span>
                    )}

                    <span onClick={handleToggleBtn} className={styles.toggle_btn}>
                      {toggleBtn ? 'Show less' : 'Expand'}
                      <DownArrow />
                    </span>
                  </td>
                </tr>
              ))}
            {loading && renderLoader(10)}
          </tbody>
        </table>
      </div>
    </>
  );
};
