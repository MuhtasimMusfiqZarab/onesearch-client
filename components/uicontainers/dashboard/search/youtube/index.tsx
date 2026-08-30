import React, { useState } from 'react';
import Modal from 'components/general/modal';
import { Filter, Reset } from 'components/_icons';
import { Pagination, Table, Dropdown, Tab, SearchBox, NotFound } from 'components/general';
import { YoutubeTableEnum } from 'components/utils/enum';
import styles from './styles.module.scss';
import { useCurrentUser } from 'components/_context/user/current-user';
import { useChannels, useCountries, useCategories } from 'components/_context/youtube';
import { searchNavElements } from 'components/utils/resolver/navigation/tab';

import { useQuery, useMutation } from '@apollo/client';
import UNLOCK_YOUTUBE_LEAD from '../../../../../pages/api/mutation/youtube/unlock-youtube-lead.gql';

export default function Index() {
  const { currentUser, loading: loadingUser } = useCurrentUser();
  const {
    channels,
    setOffset,
    setCategory,
    offset,
    setLocation,
    loading,
    total,
    searchText,
    setSearchText
  } = useChannels();
  const { countries } = useCountries();
  const { categories } = useCategories();
  let [modalIsOpen, setIsOpen] = useState(false);

  const [unlockYoutubeLead, { data, loading: unlockLoading, error }] =
    useMutation(UNLOCK_YOUTUBE_LEAD);

  const unlockLead = (id: string) => {
    unlockYoutubeLead({
      variables: {
        input: { userId: currentUser.id, youtubeId: id }
      },
      update(cache) {
        cache.evict({ id: 'ROOT_QUERY', fieldName: 'getAllChannels' });
      }
    });
    setIsOpen(!setIsOpen);
  };

  return (
    <>
      <div className={styles.container__element_inner}>
        <Tab items={searchNavElements} />
        {currentUser || channels !== null ? (
          <div className={styles.filterContainer}>
            <div className={styles.filterContainer_inner}>
              <div className={styles.search_wrap}>
                <SearchBox searchText={searchText} setSearchText={setSearchText} />

                <button className={styles.reset_form}>
                  <Reset />
                  Reset
                </button>

                <button onClick={() => setIsOpen(true)} className={styles.filtersToggle}>
                  <Filter />
                </button>
              </div>

              <div className={styles.filterItems}>
                <Dropdown
                  title="Category"
                  setItem={setCategory}
                  setOffset={setOffset}
                  items={categories}
                  isSearch={true}
                />

                <Dropdown
                  title="Countries"
                  setItem={setLocation}
                  setOffset={setOffset}
                  items={countries}
                  isSearch={true}
                />
              </div>
              <div className={styles.filterItems}>{/* <Slider /> */}</div>
            </div>

            <div className={styles.container}>
              <div className={styles.container__table}>
                {channels?.length > 0 && (
                  <Table
                    items={channels}
                    headersEnums={YoutubeTableEnum}
                    parentRoute="/dashboard/search/youtube"
                    isLocked={true}
                    unlockedItems={currentUser?.youtube ?? []}
                    onUnlock={currentUser ? unlockLead : undefined}
                  />
                )}
                {loading && <Table items={channels} headersEnums={YoutubeTableEnum} loading />}
                {!loading && channels?.length === 0 && <NotFound />}
              </div>

              {channels?.length !== 0 && (
                <div className={styles.container__pagination}>
                  <Pagination total={total} setOffset={setOffset} offset={offset} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </div>

      {/* filter modal */}
      <Modal isOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <div className={styles.edit_filters}>
          <h3>Edit Filters</h3>
          <div className={styles.filterItems}>
            <Dropdown
              title="Category"
              setItem={setCategory}
              setOffset={setOffset}
              items={categories}
              isSearch={true}
              isInline={true}
            />

            <Dropdown
              title="Countries"
              setItem={setLocation}
              setOffset={setOffset}
              items={countries}
              isSearch={true}
              isInline={true}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn_fill_secondary" onClick={() => setIsOpen(false)}>
              Apply Filter
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
