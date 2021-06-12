import React from 'react';

import styles from './Filters.css';

export function Filters({ filterArrays, currentFilters, callbackFunction }) {
  return (
    <>
      {Object.entries(currentFilters).map(([key, currentValue]) => (
        <div key={key}>
          <label htmlFor={key + '_select'}>{key}:</label>
          <select
            name={key}
            id={key + '_select'}
            className={styles.filter_select}
            onChange={e => callbackFunction(key, e.target.value)}
            value={currentValue}
          >
            <option value="All">All</option>
            {filterArrays[key].map(value => {
              return (
                <option
                  key={value}
                  value={value}
                  {...(value === currentValue ? { selected: '' } : {})}
                >
                  {value.toString()}
                </option>
              );
            })}
          </select>
        </div>
      ))}
    </>
  );
}
