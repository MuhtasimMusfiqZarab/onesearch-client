import React, { useState, useEffect } from 'react';
import { Dropbox } from 'components/general/dropbox';
import { IsCurrentRoute } from 'components/services/route';
import topNavElements from 'components/utils/resolver/navigation/topnav';
import { Loader } from 'components/general';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCurrentUser } from 'components/_context/user/current-user';

import styles from './styles.module.scss';

const Navigation = ({ humberger }) => {
  let [active, setActive] = useState(null);
  const router = useRouter();

  const { currentUser, loading } = useCurrentUser();

  const handleActive = (e) => {
    setActive(e.target.innerText);
  };

  return (
    <nav className={`primary__navigation ${humberger ? 'nav-open' : ''}`}>
      <ul>
        {topNavElements.map((menu) => (
          <li key={menu.title} className={IsCurrentRoute(menu, router.pathname) ? 'active' : ''}>
            <Link href={menu.route}>
              <a onClick={handleActive}>{menu.title}</a>
            </Link>
          </li>
        ))}

        {loading && (
          <li>
            <Link href={'/login'}>
              <div className={styles.loadingContainer}>
                <Loader isTextBox />
              </div>
            </Link>
          </li>
        )}

        {currentUser && (
          <li>
            <Dropbox currentUser={currentUser} />
          </li>
        )}

        {!currentUser && !loading && (
          <li>
            <Link href={'/login'}>
              <a className="btn btn_fill_primary">Login</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
