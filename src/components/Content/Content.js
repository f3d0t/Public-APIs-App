/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework';

import { Apis } from '../Apis/Apis';
import styles from './Content.css';

export function Content({ error, isDataLoading, apiArray, filterArrays, filters, displayRandom }) {
  if (error !== null)
    return <p class={styles.loading_text + ' ' + styles.loading_text__error}>{error}</p>;
  else if (isDataLoading) return <p class={styles.loading_text}>Data is loading</p>;

  return (
    <Apis
      apiArray={apiArray}
      filterArrays={filterArrays}
      filters={filters}
      displayRandom={displayRandom}
    />
  );
}
