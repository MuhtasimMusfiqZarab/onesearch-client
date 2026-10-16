import React, { useState } from 'react';
import { Reset } from 'components/_icons';
import { Tab, CsvDrop, NotFound, Dropdown, Popup } from 'components/general';
import { requestNavElements } from 'components/utils/resolver/navigation/tab';
import AutofillInput from 'components/general/autofill-input';
import styles from './styles.module.scss';
import { useCurrentUser } from 'components/_context/user/current-user';

import { countryList } from 'components/utils/resolver/all-countries';

import { useQuery, useMutation } from '@apollo/client';

import ADD_REQUEST from '../../../../pages/api/mutation/request/add-request.gql';

import GET_ALL_REQUESTS from '../../../../pages/api/query/request/get-all-requests.gql';

export default function Index() {
  const { currentUser, loading: loadingUser } = useCurrentUser();
  const [addRequest, { data, loading, error }] = useMutation(ADD_REQUEST);
  let [modalIsOpen, setIsOpen] = useState(false);

  const [country, setCountry] = useState<string>(null);
  const [category, setCategory] = useState<string>(null);
  const [platform, setPlatform] = useState<string>(null);
  const [datasize, setDatasize] = useState<string>(null);
  const [description, setDescription] = useState<string>(null);

  const [offset, setOffset] = useState<number>(0);

  const setRequest = () => {
    if (!currentUser?.id) return;

    const payload = {
      userId: currentUser.id,
      platform: platform || '',
      category: category || '',
      location: country || '',
      description: description || '',
      datasize: datasize || ''
    };

    addRequest({
      variables: {
        input: [payload]
      },
      update(cache) {
        cache.evict({ id: 'ROOT_QUERY', fieldName: 'getAllRequests' });
        cache.evict({ id: 'ROOT_QUERY', fieldName: 'getAllRequestsOfUser' });
      }
    });
    setIsOpen(!setIsOpen);
  };

  return (
    <>
      <div className={styles.request_container}>
        <Tab items={requestNavElements} />
        {currentUser ? (
          <>
            <div className={styles.request_container__inner}>
              <div className={styles.filterItems}>
                <AutofillInput
                  label="Platform"
                  items={['Google', 'Linkedin', 'Facebook', 'Youtube']}
                  setItem={setPlatform}
                  item={platform}
                />
                <Dropdown
                  title="Country"
                  setItem={setCountry}
                  setOffset={setOffset}
                  items={countryList}
                  isSearch={true}
                />
              </div>
              <div className={styles.filterItems}>
                <AutofillInput label="Data Size" items={[]} setItem={setDatasize} item={datasize} />
                <Dropdown
                  title="Category"
                  setItem={setCategory}
                  setOffset={setOffset}
                  items={['Company', 'Individual']}
                  isSearch={true}
                />
              </div>

              <div className={styles.notes}>
                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  placeholder="Additional Notes"
                  className={styles.notes__textarea}
                  onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            </div>
            <div className="text-right" onClick={() => setRequest()}>
              <Popup type="success" message="Successfully Requested!">
                <div>Submit</div>
              </Popup>
            </div>
          </>
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}
