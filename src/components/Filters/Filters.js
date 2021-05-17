/** @jsx createElement */
/** @jsxFrag createFragment */
import { setFilter } from '../../data/prepareData';
import { createElement, createFragment } from '../../framework/element';

import styles from './Filters.css';

export function Filters() {
  const { filterArrays, filters } = window.dataStore;
  return (
    <>
      {Object.entries(filters).map(([key, currentValue]) => (
        <div>
          <label for={key + '_select'}>{key}:</label>
          <select
            name={key}
            id={key + '_select'}
            class={styles.filter_select}
            onchange={e => setFilter(key, e.target.value, key + '_select')}
          >
            <option value="All">All</option>
            {filterArrays[key].map(value => {
              return (
                <option value={value} {...(value === currentValue ? { selected: '' } : {})}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      ))}
    </>
  );
}
