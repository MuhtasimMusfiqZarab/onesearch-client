import React, { useState } from 'react';
import Modal from 'components/general/modal';
import { Filter, Reset } from 'components/_icons';
import { Pagination, Table, Dropdown, Tab, SearchBox, NotFound } from 'components/general';
import { YoutubeTableEnum } from 'components/utils/enum';
import styles from './styles.module.scss';
import { useCurrentUser } from 'components/_context/user/current-user';
import { useChannels, useCountries, useCategories } from 'components/_context/youtube';
import { searchNavElements } from 'components/utils/resolver/navigation/tab';

import { useMutation } from '@apollo/client';
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
  const [filtersModalIsOpen, setFiltersModalIsOpen] = useState(false);
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [unlockedItems, setUnlockedItems] = useState<{ id: string }[]>([]);

  const [unlockYoutubeLead, { loading: unlockLoading, error: unlockError }] =
    useMutation(UNLOCK_YOUTUBE_LEAD);

  const promptToUnlock = (id: string) => {
    setSelectedChannelId(id);
    setUnlockModalIsOpen(true);
  };

  const unlockLead = async () => {
    if (!selectedChannelId || !currentUser?.id) return;

    try {
      await unlockYoutubeLead({
        variables: {
          input: { userId: currentUser.id, youtubeId: selectedChannelId }
        },
        update(cache) {
          cache.evict({ id: 'ROOT_QUERY', fieldName: 'getAllChannels' });
        }
      });
      setUnlockedItems((items) =>
        items.some((item) => item.id === selectedChannelId)
          ? items
          : [...items, { id: selectedChannelId }]
      );
      setUnlockModalIsOpen(false);
      setSelectedChannelId(null);
    } catch (unlockRequestError) {
      console.error('Failed to unlock YouTube channel:', unlockRequestError);
    }
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

                <button onClick={() => setFiltersModalIsOpen(true)} className={styles.filtersToggle}>
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
                    forceLocked={!currentUser?.id}
                    unlockedItems={unlockedItems}
                    onUnlock={currentUser?.id ? promptToUnlock : undefined}
                    clickableRows
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
      <Modal isOpen={filtersModalIsOpen} setIsOpen={setFiltersModalIsOpen}>
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
            <button
              type="submit"
              className="btn_fill_secondary"
              onClick={() => setFiltersModalIsOpen(false)}>
              Apply Filter
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={unlockModalIsOpen} setIsOpen={setUnlockModalIsOpen}>
        <div className={styles.edit_filters}>
          <h3>Unlock this row?</h3>
          <p>Would you like to unlock access to this YouTube channel?</p>
          {unlockError && <p role="alert">Unable to unlock this row. Please try again.</p>}
          <div className="text-center">
            <button
              type="button"
              className="btn_fill_secondary"
              onClick={() => setUnlockModalIsOpen(false)}
              disabled={unlockLoading}>
              Cancel
            </button>
            <button
              type="button"
              className="btn_fill_secondary"
              onClick={unlockLead}
              disabled={unlockLoading || !currentUser?.id}>
              {unlockLoading ? 'Unlocking...' : 'Unlock'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
