import React, { useState } from 'react';
import { Tab, NotFound, Dropdown } from 'components/general';
import { requestNavElements } from 'components/utils/resolver/navigation/tab';
import AutofillInput from 'components/general/autofill-input';
import styles from './styles.module.scss';
import { useCurrentUser } from 'components/_context/user/current-user';

import { countryList } from 'components/utils/resolver/all-countries';

import { useMutation } from '@apollo/client';

import ADD_REQUEST from '../../../../pages/api/mutation/request/add-request.gql';

export default function Index() {
  const { currentUser } = useCurrentUser();
  const [addRequest, { loading }] = useMutation(ADD_REQUEST);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [country, setCountry] = useState<string>(null);
  const [category, setCategory] = useState<string>(null);
  const [platform, setPlatform] = useState<string>(null);
  const [datasize, setDatasize] = useState<string>(null);
  const [description, setDescription] = useState<string>(null);

  const [offset, setOffset] = useState<number>(0);

  const setRequest = async () => {
    if (!currentUser?.id) return;

    setSubmitMessage(null);
    const payload = {
      userId: currentUser.id,
      platform: platform || '',
      category: category || '',
      location: country || '',
      description: description || '',
      datasize: datasize || ''
    };

    try {
      await addRequest({
        variables: {
          input: [payload]
        },
        update(cache) {
          cache.evict({ id: 'ROOT_QUERY', fieldName: 'getAllRequests' });
          cache.evict({ id: 'ROOT_QUERY', fieldName: 'getAllRequestsOfUser' });
        }
      });
      setSubmitMessage({ type: 'success', text: 'Successfully requested!' });
    } catch (requestError) {
      console.error('Failed to submit request:', requestError);
      setSubmitMessage({
        type: 'error',
        text:
          requestError instanceof Error
            ? requestError.message
            : 'Unable to submit the request. Please try again.'
      });
    }
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
            <div className="text-right">
              <button
                type="button"
                className="btn_fill_secondary"
                onClick={setRequest}
                disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            {submitMessage && (
              <p role={submitMessage.type === 'error' ? 'alert' : 'status'}>
                {submitMessage.text}
              </p>
            )}
          </>
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}
