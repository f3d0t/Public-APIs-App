/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework';

import styles from './Filters.css';

export function Filters({ filterArrays, currentFilters, callbackFunction }) {
  return (
    <>
      {Object.entries(currentFilters).map(([key, currentValue]) => (
        <div>
          <label for={key + '_select'}>{key}:</label>
          <select
            name={key}
            id={key + '_select'}
            class={styles.filter_select}
            onchange={e => callbackFunction(key, e.target.value)}
          >
            <option value="All">All</option>
            {filterArrays[key]?.map(value => {
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
