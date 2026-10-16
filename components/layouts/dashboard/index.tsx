import React from 'react';
import Header from '../../shared/header';
import SideNav from '../../shared/sidenav';
import BackToTop from 'components/general/back-to-top';

import styles from './styles.module.scss';

import { CurrentUserProvider } from 'components/_context/user/current-user';

const DashboardLayout = (props) => {
  return (
    <React.Fragment>
      <CurrentUserProvider>
        <Header />
        {!props.hideSideNav && <SideNav />}
        <div
          className={`${styles.container} ${props.hideSideNav ? styles.containerWithoutSideNav : ''}`}>
          <div className={styles.container__element}>{props.children}</div>
        </div>
        <BackToTop support={false} />
      </CurrentUserProvider>
    </React.Fragment>
  );
};

export default DashboardLayout;
