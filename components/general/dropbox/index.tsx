import React, { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

import { useRouter } from 'next/router';

interface Props {
  currentUser: any;
}

export const Dropbox: FC<Props> = ({ currentUser }: Props): JSX.Element => {
  let [userName, setUserName] = useState(null);
  let [userAvatar, setUserAvatar] = useState(null);
  let [userAccessRole, setUserAccessRole] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.firstName);
      setUserAvatar(currentUser.avatarLink);
      setUserAccessRole(currentUser.accessRole);
    }
  }, [currentUser]);

  const logout = () => {
    localStorage.removeItem('jwtToken');
    router.reload();
  };

  return (
    <ul className={styles.nav__list}>
      <li className={styles.nav__listitem}>
        <div className={styles.logged}>
          <div className={styles.logged__thumb}>
            {userAvatar && <Image src={userAvatar} alt="Nafiz" width={48} height={48} />}
          </div>
          <div className={styles.logged__details}>
            <span className={styles.logged__user}>{userName}</span>
            <span className={styles.logged__plan}>{userAccessRole}</span>
          </div>
        </div>

        <ul className={styles.nav__listitemdrop}>
          <li onClick={logout}>Logout</li>
          <li>
            <Link href="/dashboard/settings/profile">
              <p>View Profile</p>
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};
