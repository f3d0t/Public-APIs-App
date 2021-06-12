import React from 'react';

import styles from './Search.css';

export function Search({ placeholder = 'Search', value, onChange }) {
  return (
    <div>
      <label htmlFor={placeholder + '_select'}>{placeholder}:</label>
      <input
        className={styles.search}
        type="text"
        id={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    </div>
  );
}
