import React, { useState, useEffect } from 'react';
import Modal from 'components/general/modal';
import { ForbiddenAccess } from 'components/general';
import { Filter, CloseLite, Reset } from 'components/_icons';
import { Pagination, Table, Dropdown, Tab, SearchBox, Loader, Slider } from 'components/general';
import { RequestsTableEnum } from 'components/utils/enum';
import styles from './styles.module.scss';
import { useCurrentUser } from 'components/_context/user/current-user';
import { useUserRequests } from 'components/_context/request/get-user-requests';

import { useRequestCategories } from 'components/_context/request/get-categories';
import { useRequestCountries } from 'components/_context/request/get-countries';
import { useRequestPlatforms } from 'components/_context/request/get-platforms';
import { useRequestStatuses } from 'components/_context/request/get-statuses';

import { requestNavElements } from 'components/utils/resolver/navigation/tab';

export default function Index() {
  const { currentUser, loading: loadingUser } = useCurrentUser();
  const { categories } = useRequestCategories();
  const { countries } = useRequestCountries();
  const { platforms } = useRequestPlatforms();
  const { statuses } = useRequestStatuses();

  const {
    requests,
    loading: loadingAllUsers,
    setOffset,
    offset,
    refetch,
    setCategory,
    setLocation,
    setPlatform,
    setStatus,
    total,
    searchText,
    setSearchText
  } = useUserRequests();
  let [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.container__element_inner}>
        <>
          <Tab items={requestNavElements} />
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
              <div className={styles.filterItems}>
                <Dropdown
                  title="Platform"
                  setItem={setPlatform}
                  setOffset={setOffset}
                  items={platforms}
                  isSearch={true}
                />

                <Dropdown
                  title="Status"
                  setItem={setStatus}
                  setOffset={setOffset}
                  items={statuses}
                  isSearch={true}
                />
              </div>
              {/* <div className={styles.filterItems}>
                  <Slider />
                </div> */}
            </div>

            <div className={styles.container}>
              <div className={styles.container__table}>
                {requests?.length > 0 && (
                  <Table
                    items={requests}
                    headersEnums={RequestsTableEnum}
                    hasController={false}
                    hasCheckbox={false}
                    isLocked={false}
                  />
                )}
                {loadingAllUsers && (
                  <Table items={requests} headersEnums={RequestsTableEnum} loading />
                )}
                {requests?.length === 0 && <div>No User Data Found</div>}
              </div>

              <div className={styles.container__pagination}>
                <Pagination total={total} setOffset={setOffset} offset={offset} />
              </div>
            </div>
          </div>
        </>
      </div>

      {/* filter modal */}
      <Modal isOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <div className={styles.edit_filters}>
          <div className={styles.search_wrap}>
            {/* <SearchBox searchText={searchText} setSearchText={setSearchText} /> */}
            <button className={`${styles.reset_form} ${styles.reset_form_modal}`}>
              <Reset />
            </button>
          </div>
          <h3>Edit Filters</h3>
          {/* <div className={styles.filterItems}>
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

            <Dropdown
              title="Year"
              setItem={setLocation}
              setOffset={setOffset}
              items={countries}
              isSearch={true}
              isInline={true}
            />

            <Dropdown
              title="Subscriber"
              setItem={setLocation}
              setOffset={setOffset}
              items={countries}
              isSearch={true}
              isInline={true}
            />
          </div> */}
          <div className="text-center">
            <button type="submit" className="btn_fill_secondary">
              Apply Filter
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
