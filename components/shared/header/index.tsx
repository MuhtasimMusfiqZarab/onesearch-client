import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from 'components/_icons';
import Navigation from 'components/general/navigation';
import { Dropbox } from 'components/general/dropbox';
import styles from './styles.module.scss';

const Header = () => {
  let [humberger, handleHubberger] = useState(false);

  return (
    <header className={styles.site_header}>
      <div className={styles.container}>
        <div className={styles.brand_logo}>
          <Link href="/" legacyBehavior>
            <a>
              <Logo />
            </a>
          </Link>

          <button
            className={`humberger ${humberger ? 'humberger-open' : ''}`}
            aria-label="Toggle navigation"
            onClick={() => handleHubberger((humberger = !humberger))}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        {/* {currentUser?.id && <Dropbox />} */}

        {/* <Dropbox /> */}

        <Navigation humberger={humberger} />
      </div>
    </header>
  );
};

export default Header;
