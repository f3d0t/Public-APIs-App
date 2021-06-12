import React from 'react';

import { Apis } from '../Apis/Apis';
import styles from './Content.css';

export function Content({ error, isDataLoading, apiArray, filterArrays, filters, displayRandom }) {
  if (error !== null)
    return <p className={styles.loading_text + ' ' + styles.loading_text__error}>{error}</p>;
  if (isDataLoading) return <p className={styles.loading_text}>Data is loading</p>;

  return (
    <Apis
      apiArray={apiArray}
      filterArrays={filterArrays}
      filters={filters}
      displayRandom={displayRandom}
    />
  );
}
