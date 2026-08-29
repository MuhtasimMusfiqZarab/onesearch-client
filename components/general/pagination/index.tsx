import React, { FC, useState, useEffect } from 'react';
import styles from './style.module.scss';
import { ArrowLeft, ArrowRight } from 'components/_icons';

interface Props {
  offset: number;
  setOffset: (value: number) => void;
  total: any;
}

export const Pagination: FC<Props> = ({ offset, setOffset, total }): JSX.Element => {
  const [totalPages, setTotalPages] = useState<number>(null);
  const [pageInput, setPageInput] = useState<string>('1');

  useEffect(() => {
    if (total > 0) {
      let count = Math.floor(total / 10);
      if (total % 10) {
        count++;
      }
      setTotalPages(count);
      setPageInput(String(Math.floor(offset / 10 + 1)));
    } else {
      setTotalPages(null);
      setPageInput('1');
    }
  }, [total, offset]);

  const goToPage = () => {
    const parsedPage = Number(pageInput);
    if (!Number.isFinite(parsedPage) || totalPages === null) {
      return;
    }

    const safePage = Math.min(Math.max(1, parsedPage), totalPages);
    setOffset((safePage - 1) * 10);
    setPageInput(String(safePage));
  };

  const reduceOffset = () => {
    if (offset > 0) {
      setOffset(offset - 10);
    }
  };

  const increaseoffset = () => {
    if (offset + 10 < total) {
      setOffset(offset + 10);
    }
  };

  return (
    <div className={styles.pagination}>
      {total && (
        <ul>
          <li
            className={`${styles.pagination__btn} ${styles.pagination__prev}`}
            onClick={reduceOffset}>
            <ArrowLeft color="#49789b" />
            Prev
          </li>

          <li className={`${styles.pagination__number} ${styles.pagination__numberActive}`}>
            {Math.floor(offset / 10 + 1)}
          </li>

          <li className={styles.pagination__goto}>
            <span>Go to</span>
            <input
              type="number"
              min={1}
              max={totalPages || 1}
              value={pageInput}
              onChange={(event) => setPageInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  goToPage();
                }
              }}
            />
            <button type="button" onClick={goToPage}>
              Go
            </button>
          </li>

          <li
            className={`${styles.pagination__btn} ${styles.pagination__next}`}
            onClick={increaseoffset}>
            Next
            <ArrowRight color="#49789b" />
          </li>
        </ul>
      )}
    </div>
  );
};
