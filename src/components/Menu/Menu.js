import React from 'react';

import { checkBooleanAndConvert } from '../../data';
import { Filters } from '../Filters/Filters';
import { Button } from '../Button/Button';
import styles from './Menu.css';

export function Menu({
  filterArrays,
  filters,
  setFilters,
  displayRandom,
  setDisplayRandom,
  reloadData,
}) {
  const clearFilters = () => {
    const emptyFilters = {};
    Object.keys(filters).map(key => {
      emptyFilters[key] = '';
    });
    setFilters(emptyFilters);
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
      <Filters filterArrays={filterArrays} currentFilters={filters} callbackFunction={setFilter} />
      <Button text="Get random" callbackFunction={displayRandomTrigger} />
      <Button text="Clear filters" callbackFunction={clearFilters} />
      <Button text="Reload data" callbackFunction={reloadData} />
    </div>
  );
}
