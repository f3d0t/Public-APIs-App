import React, { useState, useEffect } from 'react';
import { useFiltersContext } from '../../context';
import { useDebounce } from '../../data';
import { checkBooleanAndConvert } from '../../data';

import { Search } from '../Search/Search';
import { Filters } from '../Filters/Filters';
import { Button } from '../Button/Button';

import styles from './Menu.css';

export function Menu({ setFilters, displayRandom, setDisplayRandom, reloadData, setSearch }) {
  const { filters } = useFiltersContext();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, searchTerm === '' ? 0 : 500);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setSearch(debouncedSearchTerm);
      } else {
        setSearch('');
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  );
  const clearFilters = () => {
    const emptyFilters = {};
    Object.keys(filters).map(key => {
      emptyFilters[key] = '';
    });
    setFilters(emptyFilters);
    setSearchTerm('');
    setDisplayRandom(false);
  };
  const setFilter = (key, value) => {
    const newFilters = Object.assign({}, filters);
    if (value === 'All' || value === '') {
      newFilters[key] = '';
    } else {
      newFilters[key] = checkBooleanAndConvert(value);
    }
    setFilters(newFilters);
    setDisplayRandom(false);
  };
  const displayRandomTrigger = () => {
    setDisplayRandom(typeof displayRandom == 'boolean' ? 1 : displayRandom + 1);
  };
  return (
    <div className={styles.menu}>
      <Search placeholder={'Search'} value={searchTerm} onChange={setSearchTerm} />
      <Filters callbackFunction={setFilter} />
      <Button text="Get random" callbackFunction={displayRandomTrigger} />
      <Button text="Clear filters" callbackFunction={clearFilters} />
      <Button text="Reload data" callbackFunction={reloadData} />
    </div>
  );
}
