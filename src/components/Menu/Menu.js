/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework';
import { checkBooleanAndConvert } from '../../data';
import { Filters } from '../Filters/Filters';
import { Button } from '../Button/Button';
import styles from './Menu.css';

export function Menu({ filterArrays, filters, setFilters, setDisplayRandom, setReload }) {
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
  return (
    <div class={styles.menu}>
      <Filters filterArrays={filterArrays} currentFilters={filters} callbackFunction={setFilter} />
      <Button text="Get random" callbackFunction={setDisplayRandom} />
      <Button text="Clear filters" callbackFunction={clearFilters} />
      <Button text="Reload data" callbackFunction={setReload} />
    </div>
  );
}
