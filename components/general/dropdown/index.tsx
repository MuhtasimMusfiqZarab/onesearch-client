import React, { FC, useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';

interface Props {
  title: string;
  items: string[];
  setItem: any;
  setOffset?: any;
  isSearch: boolean;
  isInline?: any;
}

export const Dropdown: FC<Props> = ({
  title,
  items,
  setItem,
  setOffset,
  isSearch,
  isInline
}: Props): JSX.Element => {
  const dropWrap = useRef(null);
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>('-');
  const [searchValue, setSearchValue] = useState<string>('');
  const [options, setOptions] = useState([]);

  const handleChange = (item) => {
    setOpened(false);
    setSelectedItem(item);
    setSearchValue(item);
    setItem(item);
    setOffset(0);
  };

  const resetFilter = () => {
    setOpened(false);
    setSelectedItem('-');
    setSearchValue('');
    setItem(null);
    setOffset(0);
  };

  const handleDropdownEleSearch = (event) => {
    const searchQuery = event.target.value;
    const trimmedQuery = searchQuery.trim();
    const optionsArr = items.filter((item) =>
      item.toLowerCase().startsWith(trimmedQuery.toLowerCase())
    );

    setOptions(optionsArr);
    setSearchValue(searchQuery);
    setItem(trimmedQuery || null);
    setSelectedItem(trimmedQuery || '-');
  };

  const handleSearchKeyDown = (event) => {
    if (event.key !== 'Enter') return;

    const trimmedValue = searchValue.trim();
    if (!trimmedValue) {
      setOpened(false);
      return;
    }

    setOpened(false);
    setSelectedItem(trimmedValue);
    setItem(trimmedValue);
    if (setOffset) setOffset(0);
  };

  useEffect(() => {
    // Hide dropdown menu after clicking outside element
    const checkIfClickedOutside = (e) => {
      if (opened && dropWrap.current && !dropWrap.current.contains(e.target)) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [opened]);

  return (
    <div className={`${styles.container} ${isInline && styles.container_inline}`}>
      <div className={styles.title}>{title}</div>
      {/* Division to show the selected items */}
      <div className={styles.select_box} ref={dropWrap}>
        <div className={`${styles.options_container} ${opened ? styles.active : ''}`}>
          {isSearch && (
            <div className={styles.item_search}>
              <input
                type="search"
                name="search"
                value={searchValue}
                onChange={handleDropdownEleSearch}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          )}

          <div className={styles.option} onClick={() => resetFilter()}>
            <input type="radio" name="category" />
            <label>All</label>
          </div>

          {options.length > 0
            ? options?.map((element, index) => {
                return (
                  <div className={styles.option} key={index} onClick={() => handleChange(element)}>
                    <input type="radio" name="category" />
                    <label>{element}</label>
                  </div>
                );
              })
            : items?.map((element, index) => {
                return (
                  <div className={styles.option} key={index} onClick={() => handleChange(element)}>
                    <input type="radio" name="category" />
                    <label>{element}</label>
                  </div>
                );
              })}
        </div>
        <div className={styles.selected} onClick={() => setOpened(!opened)}>
          {selectedItem}
        </div>
      </div>
    </div>
  );
};
