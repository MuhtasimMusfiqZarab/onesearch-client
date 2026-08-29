import { Heading } from '../heading';
import SlickSlider from 'components/general/slick';
import { Button } from 'components/general';

import { useCurrentUser } from 'components/_context/user/current-user';
import { processPayment } from 'components/uicontainers/login';

import styles from './styles.module.scss';
import { TickIcon, SilverBadgeIcon, GoldenBadgeIcon, VipBadgeIcon } from 'components/_icons';

interface Props {
  hasHeading?: boolean;
}

export default function Pricing({ hasHeading }: Props) {
  const { currentUser, loading } = useCurrentUser();

  const slickSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: 'pricing_slider',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={styles.pricing_wrap}>
      <div className={styles.pricing_wrap__inner}>
        {hasHeading && <Heading title="Pricing" isUnderline={true} />}

        {/* all the cards wrapper  */}
        <div className={styles.wrapper}>
          <SlickSlider settings={slickSettings}>
            <div
              className={styles.container}
              onClick={() => currentUser && processPayment(1)}
              role="button"
              tabIndex={currentUser ? 0 : -1}
              onKeyDown={(event) => {
                if (currentUser && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  processPayment(1);
                }
              }}>
              <h2 className={styles.title}>Silver</h2>
              <SilverBadgeIcon />
              <h2 className={styles.title}>25$</h2>
              <ul>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>1 Month Subscription</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>Unlimited Searching Data</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>3 Free Requests</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>100 Onesearch Coins</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>Support 24/7</div>
                </li>
              </ul>
              {currentUser && <Button onClick={() => processPayment(1)}>Purchase</Button>}
            </div>

            <div
              className={styles.container}
              onClick={() => currentUser && processPayment(2)}
              role="button"
              tabIndex={currentUser ? 0 : -1}
              onKeyDown={(event) => {
                if (currentUser && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  processPayment(2);
                }
              }}>
              <h2 className={styles.title}>Gold</h2>
              <GoldenBadgeIcon />
              <h2 className={styles.title}>50$</h2>
              <ul>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>3 Month Subscription</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>Unlimited Searching Data</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>5 Free Requests</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>230 Onesearch Coins</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>Support 24/7</div>
                </li>
              </ul>
              {currentUser && <Button onClick={() => processPayment(2)}>Purchase</Button>}
            </div>

            <div
              className={styles.container}
              onClick={() => currentUser && processPayment(3)}
              role="button"
              tabIndex={currentUser ? 0 : -1}
              onKeyDown={(event) => {
                if (currentUser && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  processPayment(3);
                }
              }}>
              <h2 className={styles.title}>Platinum</h2>
              <VipBadgeIcon />
              <h2 className={styles.title}>100$</h2>
              <ul>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div> 6 Month Subscription</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>Unlimited Searching Data</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>10 Free Requests</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>500 Onesearch Coins</div>
                </li>
                <li className={styles.listItems}>
                  <TickIcon />
                  <div>Support 24/7</div>
                </li>
              </ul>
              {currentUser && <Button onClick={() => processPayment(3)}>Purchase</Button>}
            </div>
          </SlickSlider>
        </div>
      </div>
    </div>
  );
}
