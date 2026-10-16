import React, { useEffect, useState } from 'react';
import { Tab, Loader, NotFound } from 'components/general';
import AutofillInput from 'components/general/autofill-input';
import { Dropdown } from 'components/general';
import { Locator, Warning } from 'components/_icons';
import styles from './styles.module.scss';
import { countryList } from 'components/utils/resolver/all-countries';

import { settingsNavElements } from 'components/utils/resolver/navigation/tab';

import { useCurrentUser } from 'components/_context/user/current-user';

import { useRouter } from 'next/router';

export default function Settings() {
  const { currentUser, loading } = useCurrentUser();

  const [title, setCountry] = useState<string>(null);
  const [offset, setOffset] = useState<number>(0);

  const router = useRouter();
  console.log(router.query.session_id);

  //process the cs token
  useEffect(() => {
    if (router.query.session_id) {
      fetch(`/payment/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + window.localStorage.getItem('jwtToken')
        },
        body: JSON.stringify({
          payments: [
            {
              session_Id: router.query.session_id.slice(0, -2)
            }
          ]
        })
      })
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }

          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ url }) => {
          // window.location = url;
          window.location.href = '/';
        })
        .catch((e) => console.error(e.error));
    }
  }, [router.query.session_id]);

  return (
    <div className={styles.container}>
      <Tab items={settingsNavElements} />
      {currentUser ? (
        <div className={styles.profile}>
          <h4>Basic Information</h4>
          <div className={styles.profile__details}>
            <div>
              <span>Name</span>
              <span>
                {currentUser ? (
                  `${currentUser.firstName} ${currentUser.lastName}`
                ) : (
                  <Loader isTextBox />
                )}
              </span>
            </div>

            <div>
              <span>Email: </span>
              <span>{currentUser ? currentUser.email : <Loader isTextBox />}</span>
            </div>

            <div>
              <span>Total Coins</span>
              <span>{currentUser ? currentUser?.availableCredits : 1}</span>
            </div>
          </div>

          <div className={styles.profile__additional}>
            <h4>Additional Information</h4>
            <div className={styles.profile__locators}>
              {/* <AutofillInput label="Country" items={[]} /> */}
              <Dropdown
                title="Title"
                setItem={setCountry}
                setOffset={setOffset}
                items={countryList}
                isSearch={true}
              />
              {/* <div>
                <Locator />
              </div> */}
            </div>

            <span className={styles.profile__warning}>
              <Warning />
              &nbsp; *You can set your country just once.
            </span>

            {/* <div className={styles.profile__locators}>
              <AutofillInput label="Phone Number" items={[]} />
            </div> */}

            <span className={styles.profile__warning}>
              <Warning />
              &nbsp; *You can set your contact number just once.
            </span>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
