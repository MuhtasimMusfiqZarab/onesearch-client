import React, { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

interface Props {
  items: any[];
}

export const Tab: FC<Props> = ({ items }: Props): JSX.Element => {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState<string>(router.pathname);

  return (
    <>
      <nav className={styles.nav}>
        {/* <a href="#" className={styles.prev__btn}>
          <svg width="14" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 24.128 3.052 13 14 1.872 12.788 0 0 13l12.788 13L14 24.128Z"
              fill="#49789B"
            />
          </svg>
        </a> */}
        <ul className={styles.list}>
          {items.map(
            (element, index): JSX.Element => {
              return (
                <li
                  key={index}
                  className={`${styles.listitem} ${
                    currentRoute === element.route ? styles.active : ''
                  }`}>
                  <Link href={`${element.route}`} legacyBehavior>
                    <a>{element.title}</a>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
        {/* <a href="#" className={styles.next__btn}>
          <svg width="14" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1.872 10.948 13 0 24.128 1.212 26 14 13 1.212 0 0 1.872Z" fill="#49789B" />
          </svg>
        </a> */}
      </nav>
    </>
  );
};
