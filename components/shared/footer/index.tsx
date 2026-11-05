import Link from 'next/link';
import { FacebookIcon, Logo, YoutubeIcon, LinkedinIcon } from 'components/_icons';
import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_widget}>
          <Link href="/" legacyBehavior>
            <a className={styles.footer_widget_logo}>
              <Logo color="#ffffff" />
            </a>
          </Link>

          <div className={styles.socials}>
            <ul>
              <li>
                <a
                  className={styles.padding}
                  href="https://www.linkedin.com/company/onesearch-io-ltd">
                  <LinkedinIcon />
                </a>
              </li>
              <li>
                <a className={styles.padding} href="https://www.facebook.com/onesearchteam">
                  <FacebookIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footer_widget}>
          <ul>
            <li>
              <h3 className={styles.link}>
                <Link href="/privacy-policy" legacyBehavior>
                  <a>FAQ</a>
                </Link>
              </h3>
            </li>
            <li>
              <h3 className={styles.link}>
                <Link href="/privacy-policy" legacyBehavior>
                  <a>Privacy Policy</a>
                </Link>
              </h3>
            </li>
            <li>
              <h3 className={styles.link}>
                <Link href="/terms-of-service" legacyBehavior>
                  <a>Terms of service</a>
                </Link>
              </h3>
            </li>
            <li>
              <h3 className={styles.link}>
                <a href="/support">Support</a>
              </h3>
            </li>
          </ul>
        </div>

        <div className={`${styles.footer_widget} ${styles.footer_widget_subscription}`}>
          <h3>Subscribe us for updates and news</h3>
          <div className={styles.subscription_form}>
            <form action="">
              <input type="email" placeholder="Email" required />
              <button className="btn btn_outline_secondary" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.footer_copy}>
        <p>{new Date().getFullYear()} © ONESEARCH.IO LTD. All rights reserved</p>
      </div>
    </footer>
  );
}
