/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';

import { Filters } from '../Filters/Filters';
import { Button } from '../Button/Button';
import { clearFilters, reloadApp, setRandom, setFilter } from '../../data/filterData';
import styles from './Menu.css';

export function Menu() {
  const { filterArrays, filters } = window.dataStore;
  return (
    <div class={styles.menu}>
      <Filters filterArrays={filterArrays} currentFilters={filters} callbackFunction={setFilter} />
      <Button text="Get random" callbackFunction={setRandom} />
      <Button text="Clear filters" callbackFunction={clearFilters} />
      <Button text="Reload data" callbackFunction={reloadApp} />
    </div>
  );
}
